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
└─ index.ts           # Bun 啟動程式入口
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
docker build -t my-bun-app .  

### 2️⃣ 運行 docker 服務
docker run -p 3000:3000 my-bun-app


### 3️⃣ 啟動服務
Bun 服務會在 http://localhost:3000 開放。

資料庫使用 PostgreSQL 並用線上服務 Neon 

```text
使用方式

1. reset資料
curl http://localhost:3000/resetAndSeed


2. 檢查服務健康
curl http://localhost:3000/health

3. 查詢可用時段
curl "http://localhost:3000/slots?date=2025-12-16"

4. 查詢使用者
curl "http://localhost:3000/users"

5. 利用 使用者ID 預約時段
curl -X POST "http://localhost:3000/bookings" \
-H "Content-Type: application/json" \
-d '{
  "user_id": "YOUR_USER_ID",
  "date": "2025-12-16",
  "time": "10:00"
}'


windos使用
curl -X POST http://localhost:3000/bookings ^
-H "Content-Type: application/json" ^
-d "{\"user_id\": \"f03cf87c-dd99-4cde-968c-ab43d6b53b9b\", \"date\": \"2025-12-16\", \"time\": \"10:00\"}" 

```

### 測試
```bash
bun test
```

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
