# api/index.py
from flask import Flask, request, jsonify
import os
import json
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 从环境变量获取API密钥
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY 环境变量未设置")

# 配置Google Generative AI
genai.configure(api_key=api_key)

# 初始化Gemini模型
model = genai.GenerativeModel('gemini-2.0-flash')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        # 获取请求数据
        data = request.json
        user_message = data.get('message', '')
        chat_history = data.get('history', [])
        
        # 构建对话历史格式
        messages = []
        for msg in chat_history:
            if msg['role'] == 'user':
                messages.append({'role': 'user', 'parts': [msg['content']]})
            else:
                messages.append({'role': 'model', 'parts': [msg['content']]})
                
        # 添加用户最新消息
        messages.append({'role': 'user', 'parts': [user_message]})
        
        # 调用Gemini模型
        chat = model.start_chat(history=messages[:-1])
        response = chat.send_message(user_message)
        
        # 返回模型响应
        return jsonify({
            'response': response.text,
            'success': True
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

# Vercel Serverless Function 入口点
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return jsonify({"status": "API is running", "endpoints": ["/api/chat"]})

# 本地开发服务器
if __name__ == '__main__':
    app.run(debug=True)
