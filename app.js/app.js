const tg = window.Telegram.WebApp;
tg.expand();

// Загрузка сообщений при открытии
async function loadMessages() {
    try {
        const response = await fetch(`${window.appConfig.API_URL}/get-messages/${tg.initDataUnsafe.user.id}`, {
            headers: {
                'X-Telegram-Init-Data': tg.initData
            }
        });
        const messages = await response.json();
        
        const messagesList = document.getElementById('messagesList');
        messagesList.innerHTML = '';
        
        messages.forEach(msg => {
            const msgElement = document.createElement('div');
            msgElement.className = 'message-item';
            msgElement.textContent = msg.text;
            messagesList.appendChild(msgElement);
        });
    } catch (error) {
        console.error('Error loading messages:', error);
        alert('Ошибка при загрузке сообщений');
    }
}

async function sendMessage() {
    const messageInput = document.querySelector('.message-input');
    const text = messageInput.value.trim();
    
    if (!text) return;

    try {
        const response = await fetch(`${window.appConfig.API_URL}/save-message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Telegram-Init-Data': tg.initData
            },
            body: JSON.stringify({
                user_id: tg.initDataUnsafe.user.id,
                text: text
            })
        });

        if (response.ok) {
            messageInput.value = '';
            loadMessages();
        } else {
            throw new Error('Failed to save message');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Ошибка при отправке сообщения');
    }
}

// Загружаем сообщения при открытии приложения
loadMessages();
