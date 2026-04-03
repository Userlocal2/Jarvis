# 06 — Security

## Базовый security target

- HTTPS
- Google OAuth
- server-side auth session validation
- nginx reverse proxy
- role-aware access
- auditability

## PQ-TLS позиция

На первом этапе разумно ориентироваться не на full production pure PQ TLS, а на:
- strong normal TLS first
- затем hybrid PQ TLS, если стек позволит

## Security priorities order

1. закрытая и понятная поверхность доступа
2. корректная аутентификация
3. корректная авторизация
4. журналирование и audit
5. TLS hardening
6. later: PQ/hybrid PQ improvements

## Что не считать решённым только из-за TLS

- права пользователей
- безопасность endpoint devices
- утечки истории чатов
- проблемы хранения токенов

## MVP security checklist

- secure cookies / tokens
- CSRF/XSS review
- auth callback hardening
- session expiration
- audit events for login/session access
- reverse proxy hardening
