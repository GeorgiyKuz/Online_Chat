# Real-time Chat Application

## Установка и запуск

### 1. Установка MongoDB
Установите MongoDB локально или используйте MongoDB Atlas (бесплатный облачный вариант)

### 2. Backend (порт 5000)
```bash
cd chat-app/server
npm install
npm start
```

### 3. Frontend (порт 3000) - **ОТКРЫВАЙТЕ ЗДЕСЬ**
```bash
cd chat-app/client
npm install
npm start
```
**http://localhost:3000** - проксирует API на :5000 автоматически

### 4. Открыть в браузере
http://localhost:3000

## Функции
- ✅ Вход по имени пользователя
- ✅ Real-time сообщения через Socket.IO
- ✅ Индикатор \"печатает...\"
- ✅ Автопрокрутка
- ✅ Красивый градиентный дизайн
- ✅ Адаптивный интерфейс
- ✅ Сохранение последних 50 сообщений в MongoDB

## Структура проекта
```
chat-app/
├── client/           # React SPA
├── server/           # Node.js + Express + Socket.IO
└── README.md
```

## Настройка .env (server/)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/chatapp
```