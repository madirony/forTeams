# 사용할 베이스 이미지 지정
FROM openjdk:17-slim

# 이미지 작성자 정보 (옵션)
LABEL maintainer="qhdrnak@gmail.com"

# 컨테이너가 리스닝할 포트 지정
EXPOSE 8080

# 작업 디렉토리 설정
WORKDIR /usr/app

# JAR 파일을 /usr/app/ 아래로 복사하고 이름을 service-app.jar로 통일
COPY build/libs/chatbot-0.0.1-SNAPSHOT.jar /usr/app/service-app.jar

# 컨테이너 시작 시 실행될 Java 애플리케이션
CMD ["java", "-jar", "service-app.jar"]