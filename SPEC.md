# HeadPic.ai - MVP 开发指令

## 项目概述
AI 专业头像生成 SaaS — 用户上传自拍，60秒内获得多种风格的专业头像。面向海外市场（英文界面）。

## 技术栈
- **前端+后端**: Next.js 14+ (App Router, TypeScript)
- **样式**: Tailwind CSS + shadcn/ui
- **AI**: 通过 OpenAI-compatible API 调用 gemini-2.5-flash-image
- **部署**: Vercel-ready

## AI API 配置
- Base URL: `https://bmc-llm-relay.nextblue.ai/v1`
- Model: `gemini-2.5-flash-image`
- Endpoint: `POST /chat/completions`
- 调用方式: OpenAI-compatible，支持图片输入(base64) + 图片输出(返回markdown格式base64图片)

### AI 调用示例
```javascript
const response = await fetch(`${process.env.AI_API_BASE_URL}/chat/completions`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.AI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: process.env.AI_MODEL,
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: stylePrompt },
        { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
      ]
    }],
    max_tokens: 4096
  })
});
// Response: choices[0].message.content 包含 "![image](data:image/png;base64,...)"
// 需要用正则提取 base64 数据
```

## .env.local
```
AI_API_BASE_URL=https://bmc-llm-relay.nextblue.ai/v1
AI_API_KEY=sk-lq7ikrQPdQv2almcm6nDYVlxEIJZdT7SaLS5NlxlnfucuWyT
AI_MODEL=gemini-2.5-flash-image
```

## 页面需求

### Landing Page (/)
- Hero section: "Professional AI Headshots in 60 Seconds"
- Before/After 对比展示（用 placeholder 图片即可）
- 5种风格预览卡片 (Corporate, Business Casual, Creative, Startup, Formal)
- 定价区域 (Starter $19 / Pro $39 / Ultimate $69)
- FAQ section
- CTA → /generate

### Generate Page (/generate)
1. 上传区域: 拖拽或点击上传自拍（jpg/png/webp, ≤10MB）
2. 照片预览 + 验证
3. 风格选择: 5种预设，可多选
4. "Generate" 按钮
5. Loading 动画（进度状态）
6. 结果网格展示
7. 单张下载 + 全部下载

### API Route (POST /api/generate)
- 接收: base64 图片 + 风格选择数组
- 处理: 并发调用 AI API 生成各风格
- 返回: 生成图片的 base64 数组
- 注意: body size limit 设为 20mb

## 5种风格 Prompts
```
Corporate: "Transform this photo into a professional corporate headshot. Keep the person's face, glasses (if any), and all facial features EXACTLY the same - this must be clearly the same person. Change to: dark navy blue suit with white dress shirt and subtle tie, clean-shaven look, soft neutral gray studio background, professional studio lighting with soft shadows, sharp focus, high resolution. Crop to head and shoulders only. The person should look confident and approachable. Output only the image."

Business Casual: "Transform this photo into a professional business casual headshot. Keep the person's face, glasses (if any), and all facial features EXACTLY the same - this must be clearly the same person. Change to: light blue oxford shirt with no tie, top button undone, modern office environment slightly blurred in background with warm lighting, natural and relaxed expression, soft professional lighting. Crop to head and shoulders only. Output only the image."

Creative: "Transform this photo into a creative professional headshot. Keep the person's face, glasses (if any), and all facial features EXACTLY the same - this must be clearly the same person. Change to: dark crew neck sweater, warm bokeh background with soft golden tones, artistic lighting with slight rim light, confident relaxed expression, modern tech company style. Crop to head and shoulders only. Output only the image."

Startup: "Transform this photo into a startup founder headshot. Keep the person's face, glasses (if any), and all facial features EXACTLY the same - this must be clearly the same person. Change to: simple black t-shirt, clean white or very light background, bright even lighting, friendly confident smile, Silicon Valley startup vibe, clean and minimal. Crop to head and shoulders only. Output only the image."

Formal: "Transform this photo into a formal executive headshot. Keep the person's face, glasses (if any), and all facial features EXACTLY the same - this must be clearly the same person. Change to: charcoal gray three-piece suit with white shirt and dark tie, deep blue gradient studio background, dramatic professional lighting, authoritative but approachable expression. Crop to head and shoulders only. Output only the image."
```

## 设计要求
- 配色: 深蓝(#1e3a5f) + 白 + 金色点缀(#c8a45c)
- 现代简洁专业风格
- 移动端响应式
- 英文界面

## 目录结构
```
headpic/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Landing page
│   ├── generate/
│   │   └── page.tsx          # 生成页面
│   └── api/
│       └── generate/
│           └── route.ts      # AI生成API
├── components/
│   ├── Hero.tsx
│   ├── StylePicker.tsx
│   ├── UploadZone.tsx
│   ├── ResultGrid.tsx
│   ├── PricingSection.tsx
│   ├── FAQ.tsx
│   └── BeforeAfter.tsx
├── lib/
│   ├── ai.ts                 # AI API 调用封装
│   ├── styles.ts             # 风格定义和prompts
│   └── utils.ts
├── public/
│   └── examples/
├── .env.local
├── package.json
├── tailwind.config.ts
└── next.config.js
```

## MVP 不需要
- 用户注册/登录
- 支付（先免费体验）
- 图片持久化存储（生成后直接返回前端下载）
- 暗色模式
