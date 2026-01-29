# Codebase Analysis & Refactoring Report

## 1. Project Overview
The project `forTeams` is a chatbot service for MS Teams usage guidance, built with:
- **Frontend:** Next.js (Modern, good choice).
- **Backend:** Spring Boot Microservices (Auth, Chatbot, Discovery, Gateway, OpenChat).
- **AI:** Python FastAPI + LangChain.
- **Infrastructure:** RabbitMQ, Redis, MongoDB, PostgreSQL.

## 2. Issues Identification

### A. Architecture
- **Complexity:** The microservices architecture (5+ Java services) introduces significant operational overhead and complexity for a project of this scale. It requires running a Service Discovery (Eureka), Gateway, and multiple databases locally.
- **Resource Usage:** Running this full stack locally for development or demonstration is resource-intensive.

### B. Code Quality & Security (AI Service)
- **Security Risk (`eval()`):** The `main.py` uses `eval()` to parse string responses from GPT. This is a severe security risk as it allows arbitrary code execution if the LLM output is manipulated or hallucinated.
- **Hardcoded Secrets:** API keys and URLs are hardcoded or handled via insecure placeholder strings (`"환경변수"`).
- **Repository Hygiene:** The `AI/app/bin` directory (Virtual Environment) is committed to the repository. This bloats the repo and causes cross-platform compatibility issues.
- **Structure:** `main.py` contains all logic (routing, business logic, prompts), making it hard to maintain.

### C. Code Quality (Backend)
- **Hardcoded Configuration:** URLs (e.g., `http://forteams.co.kr:8085`) are hardcoded in Java classes (`ChatbotController.java`), making deployment to different environments (like localhost) difficult.
- **Dead Code:** Commented-out blocks of code are left in the source.

## 3. Refactoring Recommendations

### Phase 1: Immediate Cleanup (Security & Stability)
- **AI Service:**
    - Remove `eval()` and use `json` parsing or Pydantic models.
    - Externalize configuration (API Keys) using `.env` files.
    - Modularize `main.py` into routers and services.
    - Remove `bin/` directory.
- **Backend:**
    - Externalize hardcoded URLs to `application.yml`.

### Phase 2: Architectural Simplification (Recommended for Portfolio)
- **Modular Monolith:** Consider merging the 5 Spring Boot microservices into a single Spring Boot application. This preserves the logical separation (packages) but removes the need for Eureka, Gateway, and complex networking.
- **Docker Composition:** Create a `docker-compose.yml` that spins up the simplified Backend, Frontend, and AI service along with necessary databases.

## 4. Next Steps
I will proceed with **Phase 1** of this refactoring plan to demonstrate the improvements. I will:
1. Clean up the `AI` repository structure.
2. Refactor the `AI` service to be secure and modular.
3. Fix the hardcoded URL in the `Chatbot` backend service.
