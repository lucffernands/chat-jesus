const chatBox = document.getElementById('chat-box');
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const loading = document.getElementById('loading');

function addMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = sender;

  const senderName = sender === 'user' ? '<strong>Você</strong>' : '<strong>Jesus</strong>';
  messageDiv.innerHTML = `${senderName}: ${text}`;

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addMessage('user', message);
  input.value = '';
  loading.style.display = 'block';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    if (data.reply) {
      addMessage('jesus', data.reply);
    } else {
      addMessage('jesus', 'Erro: Resposta vazia');
    }
  } catch (error) {
    addMessage('jesus', 'Erro ao se comunicar com o servidor (Erro HTTP 500)');
  } finally {
    loading.style.display = 'none';
  }

  const voiceBtn = document.getElementById('voice-btn');
  
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'pt-BR';
  recognition.interimResults = false;

  voiceBtn.addEventListener('click', () => {
    recognition.start();
    voiceBtn.textContent = '🎙️'; // muda ícone enquanto fala
  });

  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript;
    input.value = transcript;
  });

  recognition.addEventListener('end', () => {
    voiceBtn.textContent = '🎤'; // volta ao ícone original
  });
} else {
  voiceBtn.disabled = true;
  voiceBtn.title = "Reconhecimento de voz não suportado neste navegador.";
    }
});
