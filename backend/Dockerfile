FROM openjdk:11
ARG JAR_FILE = build/libs/*.jar
COPY ${JAR_FILE} fasescape.jar
ENTRYPOINT ["java", "-jar", "fasescape.jar"]
