const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const voiceBtn = document.getElementById('voice-btn');
const loadingIndicator = document.getElementById('loading');

// Função para adicionar mensagens no chat
function appendMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender === 'user' ? 'user' : 'jesus');

  const senderName = sender === 'user' ? '<strong>Você:</strong>' : '<strong style="color:#8B0000">Jesus:</strong>';
  messageDiv.innerHTML = `${senderName} ${text}`;

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Função para falar a resposta de Jesus
/* function speakJesus(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.pitch = 1;
    utterance.rate = 1;
    // Força voz masculina, se disponível
    const voices = speechSynthesis.getVoices();
    const maleVoice = voices.find(v => 
      v.lang === 'pt-BR' && (v.name.includes('Male') || v.name.includes('Ricardo') || v.name.includes('Google'))
    );
    if (maleVoice) utterance.voice = maleVoice;

    speechSynthesis.cancel(); // Evita sobreposição
    speechSynthesis.speak(utterance); 
  }
} */

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  messageInput.value = '';

  loadingIndicator.style.display = 'flex';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    loadingIndicator.style.display = 'none';

    if (data && data.reply) {
      appendMessage('jesus', data.reply);
      speakJesus(data.reply); // Fala a resposta
    } else {
      appendMessage('jesus', 'Desculpe, não recebi uma resposta.');
    }
  } catch (error) {
    loadingIndicator.style.display = 'none';
    console.error('Erro ao enviar mensagem:', error);
    // Só mostra erro se não houver mensagem já exibida
    if (!chatBox.lastChild || !chatBox.lastChild.classList.contains('jesus')) {
      appendMessage('jesus', 'Erro ao se conectar com Jesus.');
    }
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
