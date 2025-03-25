# Gemini AI 面试助手

一个简单的聊天应用，使用Google的Gemini 2.0 Flash大模型提供智能面试辅助。此应用包含Python后端和HTML/JS/CSS前端，可部署在Vercel上。

## 功能特点

- 基于Google Gemini 2.0 Flash大模型
- 响应式聊天界面
- 支持代码块和格式化文本的显示
- 历史对话记忆功能
- 可部署在Vercel上的Python后端

## 本地开发

### 前提条件

- Python 3.8或更高版本
- Google Gemini API密钥
- Node.js和npm (用于Vercel CLI)

### 设置步骤

1. 克隆此仓库
   ```
   git clone <repository-url>
   cd gemini-chat-demo
   ```

2. 创建并激活虚拟环境
   ```
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

3. 安装Python依赖
   ```
   pip install -r api/requirements.txt
   ```

4. 创建`.env.local`文件并设置API密钥
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. 安装Vercel CLI (可选，用于本地开发)
   ```
   npm install -g vercel
   ```

6. 运行本地开发服务器
   ```
   # 使用Flask
   cd api
   python index.py
   
   # 或使用Vercel CLI
   vercel dev
   ```

7. 在浏览器中访问 `http://localhost:3000` 或 `http://localhost:5000`

## 部署到Vercel

1. 安装Vercel CLI (如果尚未安装)
   ```
   npm install -g vercel
   ```

2. 登录Vercel
   ```
   vercel login
   ```

3. 设置环境变量
   在Vercel仪表板中，为项目添加环境变量`GEMINI_API_KEY`，或使用CLI：
   ```
   vercel secrets add gemini-api-key "your_gemini_api_key_here"
   ```

4. 部署项目
   ```
   vercel
   ```

5. 部署到生产环境
   ```
   vercel --prod
   ```

## 项目结构

```
gemini-chat-demo/
├── api/
│   ├── __init__.py
│   ├── index.py         # Vercel Python入口点
│   └── requirements.txt # Python依赖
├── public/
│   ├── index.html       # 前端主页
│   ├── styles.css       # 样式文件
│   └── script.js        # 前端JavaScript
├── .env.local           # 本地环境变量(不提交到版本控制)
├── .gitignore           # Git忽略文件
└── vercel.json          # Vercel配置文件
```

## 注意事项

- 免费的Vercel计划对Python函数有一些限制，如果使用频繁，可能需要考虑升级
- Google Gemini API可能有使用限制和费用，请查看最新的Google政策
- 此应用仅作为演示用途，可能需要更多功能以满足生产需求

## 技术栈

- **后端**: Python, Flask, Google Generative AI SDK
- **前端**: HTML, CSS, JavaScript (原生)
- **部署**: Vercel

## 获取Gemini API密钥

1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 创建一个账户或登录
3. 创建一个新的API密钥
4. 复制密钥并添加到项目环境变量中

## 许可

MIT
