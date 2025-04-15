# Этап 1: Сборка
FROM node:18 AS build

# Установка рабочего каталога
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Строим приложение для продакшн
RUN npm run build

# Этап 2: Запуск
FROM nginx:alpine

# Копируем скомпилированное приложение в директорию для Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Экспонируем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
