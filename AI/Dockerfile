# 베이스 이미지 선택
FROM python:3.8-slim

# 필요한 패키지 설치
RUN apt-get update && \
    apt-get install -y gcc libc6-dev



# 작업 디렉터리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 코드 복사
COPY ./app /app

# 실행 명령어 설정
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "2935"]