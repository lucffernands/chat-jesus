const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const voiceBtn = document.getElementById('voice-btn');
const loadingIndicator = document.getElementById('loading');

function appendMessage(sender, text) {
  const messageDiv = document.createElement('div');
messageDiv.classList.add('message', sender === 'user' ? 'user' : 'jesus');

const senderName = sender === 'user' ? '<strong>Você:</strong>' : '<strong>Jesus:</strong>';
messageDiv.innerHTML = `${senderName} ${text}`;

chatBox.appendChild(messageDiv);
chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  // 🔹 Diminui a altura do formulário antes da resposta
  chatForm.style.height = "40px";

  appendMessage('user', userMessage);
  messageInput.value = '';

  loadingIndicator.style.display = 'flex'; // Mostra carregamento

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    loadingIndicator.style.display = 'none'; // Oculta carregamento

    // 🔹 Restaura altura automática depois que Jesus responder
    chatForm.style.height = "auto";

    if (data && data.reply) {
      appendMessage('jesus', data.reply);
    } else {
      appendMessage('jesus', 'Desculpe, não recebi uma resposta.');
    }
  } catch (error) {
    loadingIndicator.style.display = 'none';
    chatForm.style.height = "auto"; // Garante que volta ao normal mesmo com erro
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
