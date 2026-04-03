# 03 — Server / Backend

## Цель

Построить серверный слой, который:
- принимает запросы от клиента
- аутентифицирует пользователя
- мапит пользователя и его права
- работает с чатами/сессиями
- проксирует/связывает запросы с Jarwis/OpenClaw backend

## Внешний входной слой

- nginx в контейнере
- reverse proxy перед backend API
- TLS termination на nginx или выделенном edge-слое

## Backend responsibilities

- session API
- chat list API
- message send API
- auth session handling
- user/group/role mapping
- audit/event logging

## Интеграция с Jarwis

Нужно решить один из путей:

1. Тонкий backend-bridge поверх OpenClaw sessions/tooling
2. Кастомный API layer, который хранит UI-модель чатов и мапит её на OpenClaw sessions

Рекомендуемый путь на старте:
- отдельный backend-bridge
- без переписывания ядра OpenClaw

## MVP API сущности

- user
- group
- chat
- chatMessage
- sessionBinding
- authSession
