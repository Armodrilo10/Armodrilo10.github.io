const textBox = document.getElementById('about-text-box');
const text = "My name is Kaustubh. I love Baki anime. I am currently open to any opporutnities that will make me one step closer to Baki Hanma.";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        textBox.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 20);
    }
}

document.getElementById('about-link').addEventListener('click', function(event) {
    event.preventDefault();
    if (textBox.style.display === 'none' || textBox.style.display === '') {
        textBox.style.display = 'block';
        textBox.innerHTML = "";
        index = 0;
        typeWriter();
    } else {
        textBox.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    
    chatInput.addEventListener('focus', () => {
        chatInput.placeholder = '';
    });

    chatInput.addEventListener('blur', () => {
        if (chatInput.value === '') {
            chatInput.placeholder = 'Ask questions about Kaustubh';
        }
    });

    const chatMessages = document.querySelector('.chat-messages');
    const chatBoxContainer = document.querySelector('.chat-box-container');
    let isExpanded = false;

    sendButton.addEventListener('click', () => {
        const messageText = chatInput.value;
        if (messageText.trim() !== '') {
            if (!isExpanded) {
                chatBoxContainer.classList.add('expanded');
                chatMessages.classList.add('expanded');
                isExpanded = true;
            }

            const userMessage = document.createElement('div');
            userMessage.classList.add('user-message');
            userMessage.textContent = messageText;
            chatMessages.appendChild(userMessage);

            const botMessage = document.createElement('div');
            botMessage.classList.add('bot-message');
            botMessage.textContent = 'Personalised LLM in development...';
            chatMessages.appendChild(botMessage);

            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
            sendButton.classList.add('translucent');
            setTimeout(() => {
                sendButton.classList.remove('translucent');
            }, 300);
        }
    });

    chatInput.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            sendButton.click();
        }
    });

    document.addEventListener('click', (event) => {
        if (!chatBoxContainer.contains(event.target) && event.target !== chatInput && isExpanded) {
            chatBoxContainer.classList.remove('expanded');
            chatMessages.classList.remove('expanded');
            isExpanded = false;
            chatInput.blur();
        }
    });

    chatInput.addEventListener('focus', () => {
        if (!isExpanded && chatMessages.children.length > 0) {
            chatBoxContainer.classList.add('expanded');
            chatMessages.classList.add('expanded');
            isExpanded = true;
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 27 && isExpanded) {
            chatBoxContainer.classList.remove('expanded');
            chatMessages.classList.remove('expanded');
            isExpanded = false;
            chatInput.blur();
        }
    });
});
