# Contributing

Thanks for helping make BizMuse workflows clearer and safer.

## Add Or Update A Skill

1. Keep the skill under `skills/<kebab-case-name>/`.
2. Include `name`, `version`, and a precise trigger-oriented `description` in `SKILL.md` frontmatter.
3. Keep required safety behavior in `SKILL.md`; move optional detail into one-level `references/` files.
4. Never ask users to paste API keys into chat.
5. Bump the skill version using semantic versioning.
6. Run validation and installation discovery before opening a pull request.

```bash
node scripts/validate-skills.mjs
npx skills add . --list
```

New skills should solve a real, repeatable BizMuse workflow rather than duplicate general agent knowledge.
