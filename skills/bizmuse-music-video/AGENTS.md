# bizmuse-music-video/
> L2 | 父级: ../../AGENTS.md

成员清单
.clawhubignore: ClawHub 发布边界，只保留正式英文 SKILL 与 references，排除 GEB 文档、OpenAI/Codex 展示资源和未被 Skill 调用的辅助脚本。
AGENTS.md: `bizmuse-music-video` Skill 的分发地图与真实性约束。
clawhub.json: ClawHub 目录元数据真相源，固定组织 owner、slug、分类、topics 与 GitHub provenance。
SKILL.md: 跨 Agent 发现元数据、OpenClaw 运行依赖、安全规则、凭据前置条件，以及单支/目录批量 MV 与成片下载 CLI 编排流程。
agents/: OpenAI/Codex 的品牌展示与默认调用元数据，不进入 ClawHub 文本发布包。
assets/: Skill UI 使用的 BizMuse 品牌资源，不进入 ClawHub 文本发布包。
references/: 模型参数与 prompt 参考资料，辅助 Agent 做输入决策。
scripts/: CLI 调用脚本，只负责安全传参，不重写业务逻辑。

GitHub 是源码与版本真相源，`clawhub.json` 是目录元数据真相源，ClawHub 只发布 `.clawhubignore` 过滤后的纯英文文本快照。Skill 只能描述已发布 CLI 和已实现命令；当前允许单支 MV、目录批量提交和成片下载，只暴露 `one-click-ai-mv` 模型，不得暴露平台页面抓取或站内其他模型能力。

[PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
