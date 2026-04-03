# 05 — Chat Sessions

## Ключевая идея

Каждый чат в клиенте = отдельная сессия/контекст.

Это нужно, чтобы:
- темы не смешивались
- у каждого чата было своё контекстное окно
- можно было жить в нескольких независимых направлениях

## Базовая модель

- один пользователь имеет много чатов
- каждый чат привязан к session identity на backend
- backend хранит mapping `chatId -> sessionKey/sessionId`

## Операции

### MVP
- create chat
- list chats
- open chat
- send message
- fetch history

### Later
- rename chat
- archive chat
- pin chat
- delete chat
- tags/folders

## Контекст и память

Отдельные чаты = отдельные окна контекста.
Файлы по темам не создают окно сами по себе, но могут использоваться как тематическая память.

## Future extension

- per-chat linked files
- per-chat agent profile
- per-chat system prompt overlays
