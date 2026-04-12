# Projects Index

Каждая директория внутри `projects/` должна быть отдельным git-репозиторием.

## Rule

- Корневой workspace repo игнорирует `projects/`
- Каждая папка в `projects/<name>/` — отдельный проектный repo
- Для создания нового проекта используй:

```bash
/root/.openclaw/workspace/scripts/init-project-repo.sh <project-name>
```

## Existing Project Repos

- `jarwis-client`

## Template

Шаблон лежит в:
- `templates/project-repo/README.md`
- `templates/project-repo/.gitignore`
