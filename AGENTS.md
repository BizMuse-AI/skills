# BizMuse Skills
> L1 | 独立公开仓库: https://github.com/BizMuse-AI/skills

BizMuse AI 的开放 Agent 工作流目录，以 `skills/<slug>/SKILL.md` 为发现与行为契约，GitHub 是安装和版本真相源。

<directory>
.github/ - 公开协作模板与 Skill 校验工作流
assets/ - 仓库级 BizMuse 品牌资源
scripts/ - 不依赖私有服务的结构校验工具
skills/ - 可独立安装的 Agent Skills，每个子目录拥有自己的版本和资源
</directory>

<config>
README.md - 品牌首页、技能目录、安装矩阵与产品入口
CONTRIBUTING.md - 新增或更新 Skill 的质量门槛
SECURITY.md - 私密漏洞报告与凭据边界
LICENSE - MIT 开源许可证
</config>

新增 Skill 必须创建 L2 `AGENTS.md`，业务脚本必须声明 INPUT/OUTPUT/POS 契约；修改后运行 `node scripts/validate-skills.mjs` 和本地安装发现测试。

[PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
