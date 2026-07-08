# LinkedIn Marketing MCP v1.0.0

**Free MCP server to automate LinkedIn B2B marketing — search profiles, draft connection requests, analyze companies. Premium features powered by DeepSeek AI.**

[![npm version](https://badge.fury.io/js/linkedin-marketing-mcp.svg)](https://www.npmjs.com/package/linkedin-marketing-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Sponsor](https://img.shields.io/badge/Sponsor-💖-pink.svg)](https://github.com/sponsors/1036007003-wq)

---

## 🚀 Quick Start (FREE, no API key needed)

```bash
# Install
npm install -g linkedin-marketing-mcp

# Add to your MCP client (e.g., Cline, Claude Desktop)
# No API key needed for FREE features!
node /path/to/linkedin-marketing-mcp/index.js
```

**That's it!** Start using these FREE tools immediately:
- `search_public_profiles` — Find LinkedIn profiles by keyword (via Google search)
- `analyze_company` — Analyze a LinkedIn company page (public data)
- `draft_connection_request` — Template-based connection request drafts

---

## 🔧 FREE Features (no API key)

| Tool | What it does | No API key? |
|------|---------------|--------------|
| `search_public_profiles` | Search for LinkedIn profiles (via Google) | ✅ Works immediately |
| `analyze_company` | Analyze company page (public data) | ✅ Works immediately |
| `draft_connection_request` | Draft a connection request (template) | ✅ Works immediately |

---

## 💎 PREMIUM Features (requires DeepSeek API key)

Set `DEEPSEEK_API_KEY` in your `.env` file to unlock:

| Tool | What it does | Why it's worth paying for |
|------|---------------|----------------------------|
| `optimize_linkedin_post` | AI-optimizes your LinkedIn post for max engagement | 10x more engagement |
| `generate_prospecting_list` | AI generates a prospect list based on your ICP | Save 10+ hours/week |
| `draft_connection_request` (AI mode) | AI-personalized connection requests | 3x higher acceptance rate |

**Get a DeepSeek API key:** https://platform.deepseek.com (cheap, ~$0.14/1M tokens)

---

## 📦 Installation

### For MCP Client Users (Claude Desktop, Cline, etc.)

Add to your MCP client config:

```json
{
  "mcpServers": {
    "linkedin-marketing": {
      "command": "node",
      "args": ["/path/to/linkedin-marketing-mcp/index.js"],
      "env": {
        "DEEPSEEK_API_KEY": "sk-xxx" // Optional, for premium features
      }
    }
  }
}
```

### For Developers

```bash
git clone https://github.com/1036007003-wq/linkedin-marketing-mcp.git
cd linkedin-marketing-mcp
npm install
node index.js
```

---

## 🎯 Use Cases

### 1. Find potential customers on LinkedIn
```
Use `search_public_profiles` with keyword "AI engineer"
→ Returns: Google search query to find AI engineers on LinkedIn
```

### 2. Research a target company
```
Use `analyze_company` with company name "OpenAI"
→ Returns: Checklist to analyze OpenAI's LinkedIn company page
```

### 3. Draft a non-salesy connection request
```
Use `draft_connection_request`
→ Returns: Template-based message (or AI draft with DeepSeek)
```

### 4. (Premium) Optimize your LinkedIn post
```
Use `optimize_linkedin_post`
→ Returns: AI-optimized post (hook, hashtags, best posting time)
```

### 5. (Premium) Generate a prospecting list
```
Use `generate_prospecting_list` with ICP description
→ Returns: AI-generated list of 10 prospects with outreach angles
```

---

## 🌏 For China Users (中国用户)

```bash
# If you can't access LinkedIn directly:
# 1. Set proxy
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890

# 2. Or use a China-friendly API proxy
# (We recommend setting up your own proxy, or use a VPN)
```

---

## 🆚 Why This is Better Than...

| Alternative | Problem | Our Solution |
|-------------|-----------|--------------|
| Manual LinkedIn research | Takes hours, boring | Automated in seconds |
| LinkedIn Sales Navigator | $99/month | Free basic features |
| Hiring a BDR (Business Development Rep) | $4000+ / month | One-time setup |
| Other LinkedIn tools | Require LinkedIn API (complicated) | No API needed for basic features |

---

## 🧩 More MCP Tools

| Product | Link | Free Features |
|---------|------|---------------|
| 🚀 Reddit Marketing | [Repo](https://github.com/1036007003-wq/reddit-marketing-mcp) | 3 tools |
| 🐦 Twitter/X Marketing | [Repo](https://github.com/1036007003-wq/twitter-marketing-mcp) | 3 tools |
| 💬 Discord AI Marketing | [Repo](https://github.com/1036007003-wq/discord-ai-mcp) | 3 tools |
| ⭐ GitHub Stars Growth | [Repo](https://github.com/1036007003-wq/github-stars-mcp) | 4 tools |
| 🎵 TikTok Viral Marketing | [Repo](https://github.com/1036007003-wq/tiktok-marketing-mcp) | 3 tools |

---

## 📊 Roadmap

- [x] Free: Search public profiles (via Google)
- [x] Free: Analyze company (public data)
- [x] Free: Draft connection requests (template)
- [x] Premium: AI-powered post optimization (DeepSeek)
- [x] Premium: AI prospecting list generation
- [ ] Paid: Auto-connection request sender (with rate limiting)
- [ ] Paid: Profile view analytics dashboard
- [ ] Paid: Auto-post scheduler

---

## 💰 Pricing (GitHub Sponsors)

| Tier | Price | What you get |
|------|-------|---------------|
| **Free** | $0 | 3 basic tools (no API key needed) |
| **Supporter** | $5/mo | All premium features + priority support |
| **Team** | $25/mo | All premium + custom AI prompts + prospecting templates |
| **One-time** | $99 | Lifetime access (no subscription) |

👉 **Sponsor here:** https://github.com/sponsors/1036007003-wq

---

## 🐛 Issues / Feature Requests

Open an issue: https://github.com/1036007003-wq/linkedin-marketing-mcp/issues

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=1036007003-wq/linkedin-marketing-mcp&type=Date)](https://star-history.com/#1036007003-wq/linkedin-marketing-mcp&Date)

---

**Built by [@1036007003-wq](https://github.com/1036007003-wq) | Sponsor on GitHub ❤️**

---

## 🔧 Need a Custom MCP Server?

I build custom MCP Servers for any API or system. 5-day delivery, $1,500/project.

**Contact:** Open an issue or email `1036007003@qq.com`
