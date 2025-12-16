# Booking Service

簡單的預約系統服務，使用 Bun + Drizzle ORM + PostgreSQL。
目標：快速啟動、簡單理解架構與主要功能。

---

## 專案架構

```text
src/
├─ controllers/       # 路由處理與 request/response
│   └─ appointmentController.ts
├─ services/          # 核心業務邏輯
│   └─ appointmentService.ts
├─ repositories/      # DB 存取層
│   └─ appointmentRepository.ts
│   └─ appointmentSeedRepository.ts
├─ models/            # Drizzle ORM 資料表定義
│   └─ appointment.ts
│   └─ userAppointments.ts
│   └─ users.ts
├─ utils/             # 共用工具函式
│   └─ validateDate.ts
├─ tests/             # 單元測試與整合測試
│   ├─ unit/
│   └─ integration/
├─ db.ts              # DB 連線設定
└─ server.ts          # Bun 啟動程式入口
```

---

簡單說明：

controllers 負責接收 HTTP 請求並呼叫服務。

services 負責業務邏輯，例如判斷營業時間、檢查可用 slot、預約流程。

repositories 負責與 DB 互動。

tests 包含單元測試（unit）與整合測試（integration）。

---

## Docker 建置與執行

### 1️⃣ 建立 Dockerfile

# 使用官方 Bun 映像
FROM jarredsumner/bun:latest

WORKDIR /app

# 複製專案與安裝依賴
COPY . .
RUN bun install

# 啟動服務
CMD ["bun", "run", "start"]


### 2️⃣ 建立 docker-compose.yml（PostgreSQL + 服務）

version: '3.9'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: booking
    ports:
      - "5432:5432"
  app:
    build: .
    depends_on:
      - db
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: "postgres://postgres:postgres@db:5432/booking"


### 3️⃣ 啟動服務

docker-compose up --build


Bun 服務會在 http://localhost:3000 開放。

PostgreSQL 預設帳號密碼為 postgres/postgres，資料庫名稱 booking。

使用方式
1. 檢查服務健康
curl http://localhost:3000/health

2. 查詢可用時段
curl "http://localhost:3000/available?date=2025-12-16"

3. 預約時段
curl -X POST "http://localhost:3000/bookings" \
-H "Content-Type: application/json" \
-d '{
  "user_id": "YOUR_USER_ID",
  "date": "2025-12-16",
  "time": "10:00"
}'

測試
bun test


單元測試在 tests/unit/

整合測試在 tests/integration/

測試會自動建立/重置測試資料

注意事項

時段限制為 09:00 - 16:00。

每個時段的 capacity 由資料庫定義（預設 10 人）。

使用 transaction 確保不超賣。














# booking-service

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.4. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
