# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## Coding Mode

### Coding User

- Dedicated coding user created: `jarvis-code`
- Home directory: `/home/jarvis-code`
- Intended role: use this user for future coding-agent and project-writing work instead of root when possible
- Project zone ACLs were granted on `/root/.openclaw/workspace/projects` for `jarvis-code`

## Network / Addressing

- If an IP address is needed in replies, prefer the machine's local network (LAN) IP address by default.
- Do not default to external/WAN IP unless explicitly asked.
