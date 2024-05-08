FROM node:20

# 앱 디렉토리 생성
WORKDIR /app

# 앱 의존성 설치
COPY package*.json ./
RUN npm install

# 앱 소스 추가
COPY . .

# Next.js 빌드
RUN npm run build

# 앱 시작
EXPOSE 3000
CMD ["npm", "start"]
