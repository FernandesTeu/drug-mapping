FROM node:20-bullseye-slim

# Instala as dependências necessárias para o Chromium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    lsb-release \
    xdg-utils \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia os arquivos de dependências e instala as dependências
COPY package*.json ./
RUN yarn install

# Copia o restante do código e compila o projeto (se necessário)
COPY . .
RUN yarn run build

# Variáveis de ambiente para Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV NODE_ENV=production

# Expõe a porta da aplicação (geralmente 3000 para NestJS)
EXPOSE 3000

# Inicia a aplicação
CMD ["node", "dist/main.js"]
