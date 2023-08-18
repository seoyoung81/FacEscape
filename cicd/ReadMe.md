# CI / CD

AWS EC2 Free Tier * 2, Jenkins PipeLine을 이용한 CI/CD 구축 

## Jenkins 선택 이유
---
팀원중에 Jenkins 사용 경험자가 존재했으며,  gitlab webhook과 jenkins pipeline을 이용하여 비교적 쉽게 빌드 파이프 라인은 구성할 수 있다고 판단하였습니다.


## 별도의 EC2를 구축한 이유 
---

1-1) 팀이 전반적으로 인프라 경험이 없어, 성숙도가 낮았기 때문에, 배포 작업간의 설정 실수가 빈번하였습니다.

1-2) SSAFY에서 제공하는 EC2는 설정을 잘못하는 경우 초기화 요청만 가능하므로, 기존에 설정해둔 작업 포함 CI/CD까지 함께 초기화 해야되는 문제가 있었습니다.

1-3) WebRTC 연동을 위한 Kurento Media Sever, OpenVidu Server, 게임 데이터 중계를 위한 Socket 서버, 백엔드 API 서버등, SSAFY에서 제공하는 서버에서 돌아가는 작업이 꽤나 무거운 편이였고, Jenkins 서버 또한 무거웠기 때문에 별도의 서버에서 CI를 진행한 후, SSH로 원격 서버에 배포하였습니다.


## Docker Container && Image 사용 이유 
---
1-1) 초기 CI/CD 서버에서 빌드한 파일을 SCP 파일로 전송해서 실행시키는 방식을 사용했었습니다. 이 경우 위에 언급한 대로 AWS 환경을 초기화 하는 경우, 매번 결과물을 실행시키기 위한 
런타임에 필요한 파일들을 일일히 다운 받아야했습니다. 따라서 도커 이미지로 각 서버의 결과물을 build하여 이 문제를 해결했습니다. 


## 작업 간 이슈 
---
1-1) AWS EC2 Free Tier에서 빌드 파이프라인이 실행되는 경우, CPU 사용율이 99%까지 증가하며 인스턴스가 죽는 문제가 있었습니다. 

Jenkins는 기본적으로 Ram 2GB 이상을 요구하였고,  이는 프리티어에서 사용할 수 있는 RAM 보다 컸습니다. 따라서 메모리 스왑을 이용해서 이 문제를 해결하였습니다. 

CI / CD를 위한 서버는 gitlab의 webhook을 감지, 결과물을 빌드 하는 역할만을 하므로 메모리 스왑을 해서 disk io cost가 증가해도 큰 문제는 되지 않는다고 생각하였습니다. 

1-2) Frontend에서 게임 화면의 경우 용량이 너무 크고, 런타임에 예상하지 못한 버그들이 많이 발생하였습니다. 따라서 해당 부분은 실제로 사람이 테스트를 하고 빌드하는 것이 낫다고 판단하여 CI/CD 과정에서 제거하고 SCP로 수동으로 배포하였습니다. 


## Backend Pipe Line 
```
pipeline {
    
    environment { 
        repository = "khs1996/facescape-be:latest"  //docker hub id와 repository 이름
        container_name = "facescape-be"
        DOCKERHUB_CREDENTIALS = credentials('DOCKER_HUB_TOKEN') // jenkins에 등록해 놓은 docker hub credentials 이름
    }
    
    agent any
    
    stages {
        stage('clear-prev-build') {
            steps {
                sh 'rm -rf ./*'
            }
        }
        
        stage('clone') {
            steps {
                git branch: 'backend', credentialsId: 'token', url: 'https://lab.ssafy.com/s09-webmobile1-sub2/S09P12A305'
            }
        }
        
        stage('cp-property') {
            steps {
                script {
                    withCredentials([
                        string(credentialsId: "APP_YAML", variable: 'APP_YAML')
                    ]) {
                        sh "echo ${APP_YAML} | base64 --decode > /tmp/application.yml"
                    }
                    
                    withCredentials([
                        string(credentialsId: "APP_YAML_LOCAL", variable: 'APP_YAML_LOCAL')
                    ]) {
                        sh "echo ${APP_YAML_LOCAL} | base64 --decode > /tmp/application-local.yml"
                    }
                    
                    sh """
                        cd /var/jenkins_home/workspace/Backend/backend/src/main
                        mkdir resources
                        cd resources
                        cp /tmp/application.yml .
                        cp /tmp/application-local.yml .
                    """
                }
            }
        }

        stage('build') {
            steps {
                sh '''
                    cd /var/jenkins_home/workspace/Backend/backend
                    chmod +x ./gradlew
                    ./gradlew build -x test
                '''
            }
        }
        
        stage("build-docker-image") {
            steps {
                sh '''
                    cd /var/jenkins_home/workspace/Backend/backend
                    docker build -t $repository .
                '''
            }
        }
        
        stage('login-dockerhub'){
          steps{
              sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' 
          }
        }
        
        stage('upload docker image') { 
          steps { 
              script {
                sh 'docker push $repository' 
              } 
          }
        } 
        
        stage('remove image') { 
		  steps { 
              sh "docker rmi $repository" // docker image 제거
          }
        }
        
        stage('SSH remote server deploy') {
            steps([$class: 'BapSshPromotionPublisherPlugin']) {
                sshPublisher(
                    continueOnError: false, failOnError: true,
                    publishers: [
                        sshPublisherDesc(
                            configName: "ssafy",
                            verbose: true,
                            transfers: [
                                sshTransfer(
                                    execCommand: "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin; docker pull $repository; docker stop $container_name || true && docker rm $container_name || true; docker run -itd --name $container_name --network host $repository" 
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }
}

```


## Socket Pipe Line
```
pipeline {
    environment { 
        repository = "jhp336/facescape-socket:latest"  //docker hub id와 repository 이름
        container_name = "facescape-socket"
        DOCKERHUB_CREDENTIALS = credentials('DOCKER_HUB_TOKEN') // jenkins에 등록해 놓은 docker hub credentials 이름
    }
    
    agent any
    tools {nodejs "NodeJS 16.15.0"}
    
    stages {
        stage('clear-prev-build') {
            steps {
                sh 'rm -rf ./*'
            }
        }
        
        stage('clone') {
            steps {
                git branch: 'socket', credentialsId: 'token', url: 'https://lab.ssafy.com/s09-webmobile1-sub2/S09P12A305'
            }
        }
        
        stage('cp-property') {
            steps {
                script {
                    withCredentials([
                        string(credentialsId: "ENV", variable: 'ENV')
                    ]) {
                        sh "echo ${ENV} | base64 --decode > /tmp/.env"
                    }
                    
                    sh """
                        cd /var/jenkins_home/workspace/Socket/socket
                        cp /tmp/.env .
                    """
                }
            }
        }
        
        stage('build') {
            steps {
                sh '''
                    cd /var/jenkins_home/workspace/Socket/socket
                    npm install
                    npm run build
                '''
            }
        }
        
        stage("build-docker-image") {
            steps {
                sh '''
                    cd /var/jenkins_home/workspace/Socket/socket
                    docker build -t $repository .
                '''
            }
        }
        
        stage('login-dockerhub'){
          steps{
              sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' 
          }
        }
        
        stage('upload docker image') { 
          steps { 
              script {
                sh 'docker push $repository' 
              } 
          }
        } 
        
        stage('remove image') { 
		  steps { 
              sh "docker rmi $repository" // docker image 제거
          }
        }
        
        stage('SSH remote server deploy') {
            steps([$class: 'BapSshPromotionPublisherPlugin']) {
                sshPublisher(
                    continueOnError: false, failOnError: true,
                    publishers: [
                        sshPublisherDesc(
                            configName: "ssafy",
                            verbose: true,
                            transfers: [
                                sshTransfer(
                                    execCommand: "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin; docker pull $repository; docker stop $container_name || true && docker rm $container_name || true; docker run -itd --name $container_name --network host -v /home/ubuntu/fe:/app/dist/public $repository" 
                                )
                            ]
                        )
                    ]
                )
            }
        }
        
    }
}
```
