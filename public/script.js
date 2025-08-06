const chatBox = document.getElementById('chat-box');
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const loading = document.getElementById('loading');

function addMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = sender;

  const senderName = sender === 'user' ? 'Você' : '<strong>Jesus</strong>';
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
});
