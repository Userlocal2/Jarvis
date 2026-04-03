# 08 — Subagent Task Breakdown

## A. Product / Spec Agent

### Цель
Уточнить и стабилизировать продуктовую спецификацию.

### Задачи
- уточнить user journeys
- уточнить role model
- описать chat lifecycle
- зафиксировать MVP boundaries

## B. Frontend Agent

### Цель
Сделать клиентский интерфейс.

### Задачи
- app shell
- auth screens
- chat list
- active chat view
- new chat flow
- mobile responsive behavior

## C. Backend Agent

### Цель
Сделать серверный слой между клиентом и Jarwis/OpenClaw.

### Задачи
- auth integration
- users/groups model
- chats API
- session mapping
- message flow
- persistence model

## D. Infra / DevOps Agent

### Цель
Сделать инфраструктурную обвязку.

### Задачи
- nginx container
- reverse proxy config
- env/secrets handling
- deployment baseline
- logs and monitoring baseline

## E. Security Agent

### Цель
Проверить auth, session handling и transport decisions.

### Задачи
- threat review
- OAuth hardening
- session security
- reverse proxy hardening
- TLS/PQ-TLS feasibility review
