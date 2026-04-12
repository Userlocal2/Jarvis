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

### Claude Code

- Installed locally: `/root/.local/bin/claude`
- Verified version: `2.1.80 (Claude Code)`
- Default coding agent for this workspace when the user asks for a coding mode or Claude/Cloud Code style help
- Preferred invocation pattern: `claude --permission-mode bypassPermissions --print '<task>'`
- Use as an overlay for coding tasks only, not as a replacement for Jarwis's core identity, memory, or family-profile routing
