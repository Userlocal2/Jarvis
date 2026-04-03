# 02 — Client App

## Цель

Сделать клиент с UX, близким к ChatGPT:
- список чатов слева
- активный чат справа
- создание нового чата
- переименование/архивирование чатов
- независимые сессии

## Подход

Рекомендуемый старт:
- web-first клиент
- Chromium-friendly frontend
- затем thin wrappers / PWA / packaging для платформ

## Платформы

- iPhone
- macOS
- Android
- Windows

## Клиентские функции

### MVP
- login через Google OAuth
- список чатов
- создать чат
- открыть чат
- отправить сообщение
- получить ответ
- видеть историю в рамках чата

### V2
- rename chat
- archive chat
- delete chat
- search by chat title / recent messages
- mobile-friendly layout
- optimistic UI / streaming

### V3
- attachments
- approvals UI
- group-aware sharing rules
- per-chat metadata

## UX-принципы

- минимум мессенджерности
- максимум фокуса на диалоге
- новый чат — first-class действие
- чаты не должны смешивать контекст между собой
