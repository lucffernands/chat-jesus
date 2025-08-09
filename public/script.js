const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const voiceBtn = document.getElementById('voice-btn');
const loadingIndicator = document.getElementById('loading');
const sideMenu = document.getElementById('sideMenu');
const voiceToggle = document.getElementById('voiceToggle');
const voiceRadios = document.querySelectorAll('input[name="voiceType"]');

function appendMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender === 'user' ? 'user' : 'jesus');

  const senderName =
    sender === 'user'
      ? '<strong>Você:</strong>'
      : '<strong style="color:#8B0000">Jesus:</strong>';
  messageDiv.innerHTML = `${senderName} ${text}`;

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function speakJesus(text) {
  if ('speechSynthesis' in window && isVoiceEnabled()) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.pitch = 1;
    utterance.rate = 1;

    const voices = speechSynthesis.getVoices();
    const selectedVoice = getSelectedVoice();
    if (selectedVoice) utterance.voice = selectedVoice;

    speechSynthesis.cancel(); // Evita sobreposição
    speechSynthesis.speak(utterance);
  }
}

function getSelectedVoice() {
  const selected = [...voiceRadios].find(radio => radio.checked)?.value;
  if (!selected) return null;

  const voices = speechSynthesis.getVoices();
  if (selected === 'male') {
    // Tentativa de voz masculina pt-BR
    return (
      voices.find(
        v =>
          v.lang === 'pt-BR' &&
          (v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('ricardo'))
      ) || null
    );
  } else {
    // Voz feminina padrão pt-BR
    return (
      voices.find(
        v =>
          v.lang === 'pt-BR' &&
          (v.name.toLowerCase().includes('female') ||
            v.name.toLowerCase().includes('ana') ||
            v.name.toLowerCase().includes('google'))
      ) || null
    );
  }
}

function isVoiceEnabled() {
  return localStorage.getItem('voiceEnabled') === 'true';
}

function saveSettings() {
  localStorage.setItem('voiceEnabled', voiceToggle.checked);
  const selectedVoice = [...voiceRadios].find(radio => radio.checked)?.value;
  if (selectedVoice) localStorage.setItem('voiceType', selectedVoice);
}

function loadSettings() {
  const voiceEnabledStorage = localStorage.getItem('voiceEnabled');
  if (voiceEnabledStorage !== null) {
    voiceToggle.checked = voiceEnabledStorage === 'true';
  } else {
    voiceToggle.checked = true;
  }

  const voiceTypeStorage = localStorage.getItem('voiceType');
  if (voiceTypeStorage) {
    [...voiceRadios].forEach(radio => {
      radio.checked = radio.value === voiceTypeStorage;
    });
  } else {
    // padrão feminino
    [...voiceRadios].forEach(radio => {
      radio.checked = radio.value === 'female';
    });
  }
}

chatForm.addEventListener('submit', async e => {
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
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    loadingIndicator.style.display = 'none';

    if (data && data.reply) {
      appendMessage('jesus', data.reply);
      speakJesus(data.reply);
    } else {
      appendMessage('jesus', 'Desculpe, não recebi uma resposta.');
    }
  } catch (error) {
    loadingIndicator.style.display = 'none';
    console.error('Erro ao enviar mensagem:', error);
    if (!chatBox.lastChild || !chatBox.lastChild.classList.contains('jesus')) {
      appendMessage('jesus', 'Erro ao se conectar com Jesus.');
    }
  }
});

voiceBtn.addEventListener('click', () => {
  if (!('webkitSpeechRecognition' in window)) {
    voiceBtn.disabled = true;
    voiceBtn.innerText = '🎙️ Indisponível';
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.continuous = false;

  recognition.start();

  recognition.onresult = event => {
    const transcript = event.results[0][0].transcript;
    messageInput.value = transcript;
    chatForm.dispatchEvent(new Event('submit'));
  };

  recognition.onerror = event => {
    console.error('Erro no reconhecimento de voz:', event.error);
    appendMessage('jesus', 'Não consegui entender sua voz.');
  };
});

voiceToggle.addEventListener('change', () => {
  saveSettings();
});

voiceRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    saveSettings();
  });
});

function toggleMenu() {
  sideMenu.classList.toggle('open');
}

window.onload = () => {
  loadSettings();

  // Para garantir que as vozes estejam carregadas, força atualização
  if ('speechSynthesis' in window) {
const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const voiceBtn = document.getElementById('voice-btn');
const loadingIndicator = document.getElementById('loading');
const sideMenu = document.getElementById('sideMenu');
const voiceToggle = document.getElementById('voiceToggle');
const voiceRadios = document.querySelectorAll('input[name="voiceType"]');
const closeMenuBtn = document.getElementById('closeMenu'); // Botão seta

function appendMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender === 'user' ? 'user' : 'jesus');

  const senderName =
    sender === 'user'
      ? '<strong>Você:</strong>'
      : '<strong style="color:#8B0000">Jesus:</strong>';
  messageDiv.innerHTML = `${senderName} ${text}`;

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getSelectedVoice() {
  const selected = [...voiceRadios].find(radio => radio.checked)?.value;
  if (!selected) return null;

  const voices = speechSynthesis.getVoices();
  if (selected === 'male') {
    return (
      voices.find(
        v =>
          v.lang === 'pt-BR' &&
          (v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('ricardo'))
      ) || null
    );
  } else {
    return (
      voices.find(
        v =>
          v.lang === 'pt-BR' &&
          (v.name.toLowerCase().includes('female') ||
            v.name.toLowerCase().includes('ana') ||
            v.name.toLowerCase().includes('google'))
      ) || null
    );
  }
}

function isVoiceEnabled() {
  return localStorage.getItem('voiceEnabled') === 'true';
}

function saveSettings() {
  localStorage.setItem('voiceEnabled', voiceToggle.checked);
  const selectedVoice = [...voiceRadios].find(radio => radio.checked)?.value;
  if (selectedVoice) localStorage.setItem('voiceType', selectedVoice);
}

function loadSettings() {
  const voiceEnabledStorage = localStorage.getItem('voiceEnabled');
  if (voiceEnabledStorage !== null) {
    voiceToggle.checked = voiceEnabledStorage === 'true';
  } else {
    voiceToggle.checked = true;
  }

  const voiceTypeStorage = localStorage.getItem('voiceType');
  if (voiceTypeStorage) {
    [...voiceRadios].forEach(radio => {
      radio.checked = radio.value === voiceTypeStorage;
    });
  } else {
    [...voiceRadios].forEach(radio => {
      radio.checked = radio.value === 'female';
    });
  }
}

chatForm.addEventListener('submit', async e => {
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
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    loadingIndicator.style.display = 'none';

    if (data && data.reply) {
      appendMessage('jesus', data.reply);
      // speakJesus(data.reply); // Comentado para desativar voz
    } else {
      appendMessage('jesus', 'Desculpe, não recebi uma resposta.');
    }
  } catch (error) {
    loadingIndicator.style.display = 'none';
    console.error('Erro ao enviar mensagem:', error);
    if (!chatBox.lastChild || !chatBox.lastChild.classList.contains('jesus')) {
      appendMessage('jesus', 'Erro ao se conectar com Jesus.');
    }
  }
});

voiceBtn.addEventListener('click', () => {
  if (!('webkitSpeechRecognition' in window)) {
    voiceBtn.disabled = true;
    voiceBtn.innerText = '🎙️ Indisponível';
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.continuous = false;

  recognition.start();

  recognition.onresult = event => {
    const transcript = event.results[0][0].transcript;
    messageInput.value = transcript;
    chatForm.dispatchEvent(new Event('submit'));
  };

  recognition.onerror = event => {
    console.error('Erro no reconhecimento de voz:', event.error);
    appendMessage('jesus', 'Não consegui entender sua voz.');
  };
});

voiceToggle.addEventListener('change', () => {
  saveSettings();
});

voiceRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    saveSettings();
  });
});

function toggleMenu() {
  sideMenu.classList.toggle('open');
}

// Botão seta para fechar
closeMenuBtn.addEventListener('click', () => {
  sideMenu.classList.remove('open');
});

window.onload = () => {
  loadSettings();
  if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = () => {};
  }
};
