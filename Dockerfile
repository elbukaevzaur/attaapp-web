# Используем официальный легкий образ Node.js с Alpine
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы приложения
COPY . .

# Собираем приложение
RUN npm run build

# Создаем финальный образ
FROM node:18-alpine AS runner

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы из сборки
COPY package*.json ./
RUN npm install --production

# Копируем собранное приложение
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Устанавливаем переменные окружения
ENV NODE_ENV=production

# Указываем порт, который будет слушать приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]