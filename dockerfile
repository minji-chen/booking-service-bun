# 使用官方 Bun image
FROM oven/bun:latest

# 設定工作目錄
WORKDIR /app

# 複製專案檔案
COPY . .

# 安裝依賴（Bun 會自動讀 package.json / bun.lockb）
RUN bun install

# 如果需要建置（例如 TypeScript / ESBuild）
# RUN bun run build

# 開放端口（例如你的 API 3000）
EXPOSE 3000

# 啟動 Bun 應用
CMD ["bun", "run", "start"]
#CMD ["sh", "-c", "bun run start & bun test"]