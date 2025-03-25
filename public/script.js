// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // 存储聊天历史
    let chatHistory = [
        { role: 'assistant', content: '您好！我是AI面试助手，请问有什么可以帮助您的？' }
    ];
    
    // 发送消息
    const sendMessage = async () => {
        const message = userInput.value.trim();
        if (!message) return;
        
        // 清空输入框
        userInput.value = '';
        
        // 添加用户消息到聊天界面
        appendMessage('user', message);
        
        // 添加到历史记录
        chatHistory.push({ role: 'user', content: message });
        
        // 显示输入中指示器
        showTypingIndicator();
        
        try {
            // 本地开发时使用相对路径，部署时使用绝对路径
            const apiUrl = window.location.hostname === 'localhost' 
                ? 'http://localhost:3000/api/chat' 
                : '/api/chat';
            
            // 发送请求到API
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    history: chatHistory
                })
            });
            
            const data = await response.json();
            
            // 移除输入中指示器
            removeTypingIndicator();
            
            if (data.success) {
                // 添加助手回复到聊天界面
                appendMessage('assistant', data.response);
                
                // 添加到历史记录
                chatHistory.push({ role: 'assistant', content: data.response });
            } else {
                // 显示错误信息
                appendMessage('assistant', `抱歉，发生了错误: ${data.error || '未知错误'}`);
            }
        } catch (error) {
            // 移除输入中指示器
            removeTypingIndicator();
            
            // 显示错误信息
            appendMessage('assistant', `抱歉，发生了网络错误: ${error.message}`);
        }
    };
    
    // 添加消息到聊天界面
    const appendMessage = (role, content) => {
        // 将代码块标记替换为HTML
        const formattedContent = formatContent(content);
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${formattedContent}</p>`;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
    
    // 格式化内容，支持代码块等Markdown元素
    const formatContent = (content) => {
        // 替换代码块
        let formatted = content.replace(/```([\s\S]*?)```/g, (match, code) => {
            return `<pre><code>${code.trim()}</code></pre>`;
        });
        
        // 替换内联代码
        formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // 替换换行符为<br>
        formatted = formatted.replace(/\n/g, '<br>');
        
        return formatted;
    };
    
    // 显示输入中指示器
    const showTypingIndicator = () => {
        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'message assistant';
        indicatorDiv.innerHTML = `
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        indicatorDiv.id = 'typing-indicator';
        chatMessages.appendChild(indicatorDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
    
    // 移除输入中指示器
    const removeTypingIndicator = () => {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    };
    
    // 事件监听器
    sendButton.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // 自动聚焦到输入框
    userInput.focus();
});
