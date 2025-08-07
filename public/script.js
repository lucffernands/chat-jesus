const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const voiceBtn = document.getElementById('voice-btn');

function appendMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender === 'user' ? 'user' : 'jesus');
  messageDiv.innerHTML = `<strong>${sender === 'user' ? 'Você' : 'Jesus'}:</strong> ${text}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  messageInput.value = '';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();

    if (data && data.reply) {
      appendMessage('jesus', data.reply);
    } else {
      appendMessage('jesus', 'Desculpe, não recebi uma resposta.');
    }
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    appendMessage('jesus', 'Erro ao se conectar com Jesus.');
  }
});

// Reconhecimento de voz
if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.continuous = false;

  voiceBtn.addEventListener('click', () => {
    recognition.start();
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    messageInput.value = transcript;
    chatForm.dispatchEvent(new Event('submit'));
  };

  recognition.onerror = (event) => {
    console.error('Erro no reconhecimento de voz:', event.error);
    appendMessage('jesus', 'Não consegui entender sua voz.');
  };
} else {
  voiceBtn.disabled = true;
  voiceBtn.innerText = '🎙️ Indisponível';
}
