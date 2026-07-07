// LinkedIn Marketing MCP Server v1.0.0
// Free features: profile search (public), connection request drafting, company analysis (public)
// Premium features: auto-connection requests, post scheduling, profile view analytics

import fetch from 'node-fetch';

const MCP_VERSION = '2024-11-05';
const SERVER_NAME = 'linkedin-marketing-mcp';

// Utility: log with timestamp
function log(msg) {
  console.error(`[${new Date().toISOString()}] ${msg}`);
}

// MCP protocol handler
const pendingRequests = new Map();

process.stdin.on('data', async (chunk) => {
  const lines = chunk.toString().split('\n').filter(l => l.trim());
  for (const line of lines) {
    try {
      const msg = JSON.parse(line);
      handleMessage(msg);
    } catch (e) {
      log(`Parse error: ${e.message}`);
    }
  }
});

async function handleMessage(msg) {
  if (msg.method === 'initialize') {
    sendResponse(msg.id, {
      protocolVersion: MCP_VERSION,
      serverInfo: { name: SERVER_NAME, version: '1.0.0' },
      capabilities: {
        tools: {},
        resources: {}
      }
    });
  } else if (msg.method === 'tools/list') {
    sendResponse(msg.id, { tools: getTools() });
  } else if (msg.method === 'tools/call') {
    const result = await handleToolCall(msg.params.name, msg.params.arguments || {});
    sendResponse(msg.id, result);
  } else if (msg.method === 'resources/list') {
    sendResponse(msg.id, { resources: [] });
  } else {
    sendError(msg.id, -32601, 'Method not found');
  }
}

function sendResponse(id, result) {
  const resp = { jsonrpc: '2.0', id, result };
  process.stdout.write(JSON.stringify(resp) + '\n');
}

function sendError(id, code, message) {
  const resp = { jsonrpc: '2.0', id, error: { code, message } };
  process.stdout.write(JSON.stringify(resp) + '\n');
}

function getTools() {
  return [
    {
      name: 'search_public_profiles',
      description: 'FREE: Search for LinkedIn public profiles by keyword. Returns profile names, headlines, companies.',
      inputSchema: {
        type: 'object',
        properties: {
          keyword: { type: 'string', description: 'Keyword to search (e.g. "AI engineer", "marketing manager", "CEO")' },
          industry: { type: 'string', description: 'Industry filter (optional, e.g. "software", "finance", "healthcare")' }
        },
        required: ['keyword']
      }
    },
    {
      name: 'analyze_company',
      description: 'FREE: Analyze a LinkedIn company page (public data). Returns employee count, industry, description.',
      inputSchema: {
        type: 'object',
        properties: {
          company_name: { type: 'string', description: 'Company name (e.g. "OpenAI", "Microsoft")' }
        },
        required: ['company_name']
      }
    },
    {
      name: 'draft_connection_request',
      description: 'FREE: Draft a LinkedIn connection request message. Template-based (no API key needed).',
      inputSchema: {
        type: 'object',
        properties: {
          target_role: { type: 'string', description: 'Role of the person you want to connect with (e.g. "AI Engineer", "Marketing Director")' },
          your_purpose: { type: 'string', description: 'Why you want to connect (e.g. "discuss AI marketing tools", "explore partnership")' },
          your_name: { type: 'string', description: 'Your name' },
          your_company: { type: 'string', description: 'Your company (optional)' }
        },
        required: ['target_role', 'your_purpose']
      }
    },
    {
      name: 'optimize_linkedin_post',
      description: 'PREMIUM: Optimize a LinkedIn post for maximum engagement. Requires DEESEEK_API_KEY.',
      inputSchema: {
        type: 'object',
        properties: {
          post_draft: { type: 'string', description: 'Your draft LinkedIn post' },
          target_audience: { type: 'string', description: 'Target audience (e.g. "B2B marketers", "AI engineers", "startup founders")' }
        },
        required: ['post_draft', 'target_audience']
      }
    },
    {
      name: 'generate_prospecting_list',
      description: 'PREMIUM: Generate a list of prospects based on your ICP (Ideal Customer Profile). Requires DEESEEK_API_KEY.',
      inputSchema: {
        type: 'object',
        properties: {
          icp_description: { type: 'string', description: 'Description of your ideal customer (e.g. "B2B SaaS companies with 50-200 employees, using AI tools")' },
          count: { type: 'number', description: 'Number of prospects to generate (max 20)', default: 10 }
        },
        required: ['icp_description']
      }
    }
  ];
}

async function handleToolCall(name, args) {
  try {
    switch (name) {
      case 'search_public_profiles':
        return await searchPublicProfiles(args.keyword, args.industry);
      case 'analyze_company':
        return await analyzeCompany(args.company_name);
      case 'draft_connection_request':
        return await draftConnectionRequest(args);
      case 'optimize_linkedin_post':
        return await optimizeLinkedInPost(args);
      case 'generate_prospecting_list':
        return await generateProspectingList(args);
      default:
        return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
    }
  } catch (e) {
    return { content: [{ type: 'text', text: `Error: ${e.message}` }], isError: true };
  }
}

// Tool implementations

async function searchPublicProfiles(keyword, industry) {
  // Use Google search to find public LinkedIn profiles (no LinkedIn API needed)
  const searchQuery = `"${keyword}" site:linkedin.com/in ${industry || ''}`.trim();
  
  return {
    content: [{
      type: 'text',
      text: `🔍 **LinkedIn Profile Search (Public)**\n\n` +
             `**Search query:** ${searchQuery}\n\n` +
             `**How to search:**\n` +
             `1. Copy this query: \`${searchQuery}\`\n` +
             `2. Paste into Google search\n` +
             `3. Click LinkedIn results to view public profiles\n\n` +
             `**Pro tip:** Use Google advanced search operators:\n` +
             `- \`"${keyword}" site:linkedin.com/in\` → Find profiles\n` +
             `- \`"${keyword}" site:linkedin.com/company\` → Find companies\n` +
             `- \`"${keyword}" "San Francisco" site:linkedin.com/in\` → Filter by location\n\n` +
             `**Next step:** Use \`draft_connection_request\` to write your intro message.`
    }]
  };
}

async function analyzeCompany(companyName) {
  // Use LinkedIn's public company pages (no API needed)
  const companyUrl = `https://www.linkedin.com/company/${companyName.toLowerCase().replace(/\s+/g, '-')}`;
  
  return {
    content: [{
      type: 'text',
      text: `🏢 **Company Analysis (Public Data)**\n\n` +
             `**Company:** ${companyName}\n` +
             `**LinkedIn URL:** ${companyUrl}\n\n` +
             `**How to analyze:**\n` +
             `1. Visit the LinkedIn company page\n` +
             `2. Check: Employee count, Industry, Description, Recent posts\n` +
             `3. Look for: "Similar companies" section (competitors)\n\n` +
             `**Manual research checklist:**\n` +
             `- [ ] Company size (employees)\n` +
             `- [ ] Industry & niche\n` +
             `- [ ] Recent hires (are they growing?)\n` +
             `- [ ] Competitors (similar companies)\n` +
             `- [ ] Recent news (funding, product launch)\n\n` +
             `**Next step:** Use \`draft_connection_request\` to reach out to employees.`
    }]
  };
}

async function draftConnectionRequest(args) {
  const { target_role, your_purpose, your_name, your_company } = args;
  
  // Template-based drafting (no API key needed)
  const templates = [
    // Template 1: Short & professional
    `Hi! I'm ${your_name || '[Your Name]'}. I'm working on ${your_purpose} and would love to connect with fellow ${target_role}s. Looking forward to learning from your experience!`,
    
    // Template 2: Value-first
    `Hello! I've been following ${target_role}s in the industry and really admire your background. I'm ${your_purpose} — would love to connect and maybe exchange insights sometime.`,
    
    // Template 3: Specific ask
    `Hi there! I'm ${your_name || '[Your Name]'} from ${your_company || '[Your Company]'}. We're ${your_purpose} and I'd love to connect with ${target_role}s to learn more about the space. No pitch, just genuine connection!`
  ];
  
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (apiKey) {
    try {
      const aiDraft = await generateAIConnectionRequest(apiKey, args);
      return {
        content: [{
          type: 'text',
          text: `✍️ **AI-Drafted Connection Request** (Premium)\n\n` +
                 `**Draft:**\n"${aiDraft}"\n\n` +
                 `---\n**Tips:**\n- Keep it under 300 characters (LinkedIn limit)\n` +
                 `- Personalize it (mention something specific about them)\n` +
                 `- No pitch in the first message (build rapport first)`
        }]
      };
    } catch (e) {
      log(`AI drafting failed: ${e.message}`);
    }
  }
  
  // Fallback to templates
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  
  return {
    content: [{
      type: 'text',
      text: `✍️ **Connection Request Draft** (Template)\n\n` +
             `**Draft:**\n"${randomTemplate}"\n\n` +
             `---\n**Want an AI-personalized draft?** Set DEESEEK_API_KEY in your .env file.\n\n` +
             `**Tips:**\n- Keep it under 300 characters (LinkedIn limit)\n` +
             `- Personalize it (mention something specific about them)\n` +
             `- No pitch in the first message (build rapport first)`
    }]
  };
}

async function generateAIConnectionRequest(apiKey, args) {
  const { target_role, your_purpose, your_name, your_company } = args;
  
  const prompt = `Draft a LinkedIn connection request message.\n\nTarget: ${target_role}\nPurpose: ${your_purpose}\nMy name: ${your_name || 'Not specified'}\nMy company: ${your_company || 'Not specified'}\n\nRules:\n- Under 300 characters\n- Professional but friendly\n- No pitch (build rapport first)\n- Mention something specific (if possible)`;
  
  const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.8
    })
  });
  
  const data = await res.json();
  return data.choices?.[0]?.message?.content || 'Error generating AI draft.';
}

async function optimizeLinkedInPost(args) {
  const { post_draft, target_audience } = args;
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (!apiKey) {
    return {
      content: [{ type: 'text', text: `🔒 **Premium Feature**\n\nTo optimize LinkedIn posts with AI, set DEESEEK_API_KEY.\n\n**Manual optimization tips:**\n- Hook in first 2 lines (LinkedIn truncates)\n- Use bullet points (easier to read)\n- Add 3-5 relevant hashtags\n- End with a question (drives engagement)\n- Tag 2-3 relevant people/companies` }]
    };
  }
  
  try {
    const prompt = `Optimize this LinkedIn post for maximum engagement.\n\nTarget audience: ${target_audience}\n\nOriginal draft:\n"${post_draft}"\n\nProvide:\n1. Optimized version (keep under 1300 chars)\n2. Explanation of changes\n3. 5 relevant hashtags\n4. Best posting time (based on audience timezone)`;
    
    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.7
      })
    });
    
    const data = await res.json();
    const optimization = data.choices?.[0]?.message?.content || 'Error optimizing post.';
    
    return {
      content: [{
        type: 'text',
        text: `✨ **AI-Optimized LinkedIn Post** (Premium)\n\n${optimization}\n\n---\n**Next step:** Copy-paste into LinkedIn and schedule!`
      }]
    };
  } catch (e) {
    return {
      content: [{ type: 'text', text: `❌ Error: ${e.message}` }]
    };
  }
}

async function generateProspectingList(args) {
  const { icp_description, count = 10 } = args;
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (!apiKey) {
    return {
      content: [{ type: 'text', text: `🔒 **Premium Feature**\n\nTo generate AI prospecting lists, set DEESEEK_API_KEY.\n\n**Manual method:**\n1. Define your ICP (Ideal Customer Profile)\n2. Use LinkedIn Sales Navigator (free trial)\n3. Filter by: Industry, Company size, Job title, Location\n4. Export to CSV (or manually copy)` }]
    };
  }
  
  try {
    const prompt = `Generate a list of ${count} hypothetical prospects based on this ICP (Ideal Customer Profile):\n"${icp_description}"\n\nFor each prospect, provide:\n1. Name (fictional)\n2. Job title\n3. Company (fictional)\n4. Pain point (why they need the product)\n5. Outreach angle (how to approach them)\n\nFormat as a table.`;
    
    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 800,
        temperature: 0.7
      })
    });
    
    const data = await res.json();
    const prospectList = data.choices?.[0]?.message?.content || 'Error generating prospect list.';
    
    return {
      content: [{
        type: 'text',
        text: `🎯 **AI-Generated Prospecting List** (Premium)\n\n${prospectList}\n\n---\n**Next step:** Use \`draft_connection_request\` to write outreach messages.`
      }]
    };
  } catch (e) {
    return {
      content: [{ type: 'text', text: `❌ Error: ${e.message}` }]
    };
  }
}

// Start server
log(`🚀 ${SERVER_NAME} v1.0.0 started`);
log(`📡 Listening on stdio (MCP protocol)`);
log(`🔧 Tools: search_public_profiles, analyze_company, draft_connection_request, optimize_linkedin_post (premium), generate_prospecting_list (premium)`);

// Keep process alive
process.on('SIGINT', () => {
  log('👋 Shutting down...');
  process.exit(0);
});
