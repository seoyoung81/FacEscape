## 개발 환경
```
Vs Code: 1.81
IntelliJ : 2023.1.3 ulitimate
openjdk: 11 
Node: 18.16.1
DB: Maria DB
```

## 빌드
1) Spring
```
./gradlew build
docker build -t . 이미지명  
docker run -itd --name $container_name --network host $repository
```

2) Socket 서버
```
npm i
npm run build
docker build -t . 이미지명
docker run -itd --name 컨테이너명 --network host -v /home/ubuntu/fe:/app/dist/public 이미지명 
```

3) FrontEnd
```
npm i
npm run build
build 결과물 (build 폴더 제외) 도커 볼륨으로 준 host 디렉토리로 이동
```

서비스 이용 방법 
0. 
1. 도커 설치
2. Openvidu 설치 curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash   (https://docs.openvidu.io/en/2.28.0/deployment/ce/on-premises/ 독스 참고)
3. Openvidu docker-compose.yml 설정 수정 
```
version: '3.1'

services:

    openvidu-server:
        image: openvidu/openvidu-server:2.28.0
        restart: on-failure
        network_mode: host
        entrypoint: ['/usr/local/bin/entrypoint.sh']
        volumes:
            - ./coturn:/run/secrets/coturn
            - /var/run/docker.sock:/var/run/docker.sock
            - ${OPENVIDU_RECORDING_PATH}:${OPENVIDU_RECORDING_PATH}
            - ${OPENVIDU_RECORDING_CUSTOM_LAYOUT}:${OPENVIDU_RECORDING_CUSTOM_LAYOUT}
            - ${OPENVIDU_CDR_PATH}:${OPENVIDU_CDR_PATH}
        env_file:
            - .env
        environment:
            - SERVER_SSL_ENABLED=false
            - SERVER_PORT=5443
            - KMS_URIS=["ws://localhost:8888/kurento"]
            - COTURN_IP=${COTURN_IP:-auto-ipv4}
            - COTURN_PORT=${COTURN_PORT:-3478}
        logging:
            options:
                max-size: "${DOCKER_LOGS_MAX_SIZE:-100M}"

    kms:
        image: ${KMS_IMAGE:-kurento/kurento-media-server:7.0.1}
        restart: always
        network_mode: host
        ulimits:
          core: -1
        volumes:
            - /opt/openvidu/kms-crashes:/opt/openvidu/kms-crashes
            - ${OPENVIDU_RECORDING_PATH}:${OPENVIDU_RECORDING_PATH}
            - /opt/openvidu/kurento-logs:/opt/openvidu/kurento-logs
        environment:
            - KMS_MIN_PORT=40000
            - KMS_MAX_PORT=57000
            - GST_DEBUG=${KMS_DOCKER_ENV_GST_DEBUG:-}
            - KURENTO_LOG_FILE_SIZE=${KMS_DOCKER_ENV_KURENTO_LOG_FILE_SIZE:-100}
            - KURENTO_LOGS_PATH=/opt/openvidu/kurento-logs
        logging:
            options:
                max-size: "${DOCKER_LOGS_MAX_SIZE:-100M}"

    coturn:
        image: openvidu/openvidu-coturn:2.28.0
        restart: on-failure
        ports:
            - "${COTURN_PORT:-3478}:${COTURN_PORT:-3478}/tcp"
            - "${COTURN_PORT:-3478}:${COTURN_PORT:-3478}/udp"
        env_file:
            - .env
        volumes:
            - ./coturn:/run/secrets/coturn
        command:
            - --log-file=stdout
            - --listening-port=${COTURN_PORT:-3478}
            - --fingerprint
            - --min-port=${COTURN_MIN_PORT:-57001}
            - --max-port=${COTURN_MAX_PORT:-65535}
            - --realm=openvidu
            - --verbose
            - --use-auth-secret
            - --static-auth-secret=$${COTURN_SHARED_SECRET_KEY}
        logging:
            options:
                max-size: "${DOCKER_LOGS_MAX_SIZE:-100M}"

    nginx:
        image: openvidu/openvidu-proxy:2.28.0
        restart: always
        network_mode: host
        volumes:
            - ./nginx-config/:/etc/nginx/conf.d
            -  /etc/letsencrypt:/etc/letsencrypt
            - ./certificates:/etc/letsencrypt
            - ./owncert:/owncert
            - ./custom-nginx-vhosts:/etc/nginx/vhost.d/
            - ./custom-nginx-locations:/custom-nginx-locations
            - ${OPENVIDU_RECORDING_CUSTOM_LAYOUT}:/opt/openvidu/custom-layout
        environment:
            - DOMAIN_OR_PUBLIC_IP=${DOMAIN_OR_PUBLIC_IP}
            - CERTIFICATE_TYPE=${CERTIFICATE_TYPE}
            - LETSENCRYPT_EMAIL=${LETSENCRYPT_EMAIL}
            - PROXY_HTTP_PORT=${HTTP_PORT:-}
            - PROXY_HTTPS_PORT=${HTTPS_PORT:-}
            - PROXY_HTTPS_PROTOCOLS=${HTTPS_PROTOCOLS:-}
            - PROXY_HTTPS_CIPHERS=${HTTPS_CIPHERS:-}
            - PROXY_HTTPS_HSTS=${HTTPS_HSTS:-}
            - ALLOWED_ACCESS_TO_DASHBOARD=${ALLOWED_ACCESS_TO_DASHBOARD:-}
            - ALLOWED_ACCESS_TO_RESTAPI=${ALLOWED_ACCESS_TO_RESTAPI:-}
            - PROXY_MODE=CE
            - WITH_APP=true
            - SUPPORT_DEPRECATED_API=${SUPPORT_DEPRECATED_API:-false}
            - REDIRECT_WWW=${REDIRECT_WWW:-false}
            - WORKER_CONNECTIONS=${WORKER_CONNECTIONS:-10240}
            - PUBLIC_IP=${PROXY_PUBLIC_IP:-auto-ipv4}
        logging:
            options:
                max-size: "${DOCKER_LOGS_MAX_SIZE:-100M}"
```

4.  ./openvidu start

5. backend server, socket server 컨테이너 실행 

6. openvidu nginx 설정 수정 (doker volumn과 연동된 경로 docker-compose 참고)

```
# Your App
upstream yourapp {
    server localhost:3050;
}

upstream openviduserver {
    server localhost:5443;
}

upstream backendserver {
    server localhost:9090;
}

server {
    listen 80;
    listen [::]:80;
    server_name i9a305.p.ssafy.io;

    # Redirect to https
    location / {
        rewrite ^(.*) https://i9a305.p.ssafy.io:443$1 permanent;
    }

    # letsencrypt
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location /nginx_status {
        stub_status;
        allow 127.0.0.1;        #only allow requests from localhost
        deny all;               #deny all other hosts
    }
}



server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name i9a305.p.ssafy.io;

    # SSL Config
    ssl_certificate         /etc/letsencrypt/live/i9a305.p.ssafy.io/fullchain.pem;
    ssl_certificate_key     /etc/letsencrypt/live/i9a305.p.ssafy.io/privkey.pem;
    ssl_session_cache shared:SSL:50m;
    ssl_session_timeout 5m;
    ssl_stapling on;
    ssl_stapling_verify on;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384";
    ssl_prefer_server_ciphers off;

    add_header Strict-Transport-Security "max-age=63072000" always;

    # Proxy
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Proto https;
    proxy_headers_hash_bucket_size 512;
    proxy_redirect off;

    # Websockets
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    # Your App
    location / {
        proxy_pass http://yourapp; # Openvidu call by default
    }

    location /api/backend {
        rewrite ^/api/backend(.*)$ $1 break;
        proxy_pass http://backendserver;
    }

    ########################
    # OpenVidu Locations   #
    ########################
    #################################
    # Common rules CE              #
    #################################
    # Dashboard rule
                                                                                                                                                                            
    location /dashboard {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    # Websocket rule
    location ~ /openvidu$ {
        proxy_pass http://openviduserver;
    }


    #################################
    # New API                       #
    #################################
    location /openvidu/layouts {
        rewrite ^/openvidu/layouts/(.*)$ /custom-layout/$1 break;
        root /opt/openvidu;
    }

    location /openvidu/recordings {
        proxy_pass http://openviduserver;
    }

    location /openvidu/api {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    location /openvidu/info {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    location /openvidu/accept-certificate {
        proxy_pass http://openviduserver;
    }

    location /openvidu/cdr {
          allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    #################################
    # LetsEncrypt                   #
    #################################
    location /.well-known/acme-challenge {
        root /var/www/certbot;
        try_files $uri $uri/ =404;
    }

}
                                                                                                                                                        
```

7. openvidu/openvidu-proxy:2.28.0 실행중인 컨테이너로 접속 
docker exec -it 해당 컨테이너명 /bin/bash
nginx -s reload 
