require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  const apiKey = process.env.OPENROUTER_API_KEY;

  console.log('Mensagem recebida:', userMessage);
  console.log('Usando chave:', apiKey ? 'DEFINIDA' : 'NÃO DEFINIDA');

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://chat-jesus.onrender.com',
        'X-Title': 'Chat com Jesus'
      },
      body: JSON.stringify({
        model: 'openrouter/deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'Você é Jesus. Responda com sabedoria, amor e empatia, guiando o usuário com compaixão.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();
    console.log('Resposta da OpenRouter:', data);

    if (data.choices && data.choices.length > 0) {
      const reply = data.choices[0].message.content;
      res.json({ reply });
    } else {
      res.json({ reply: 'Jesus: Não consegui entender sua pergunta no momento.' });
    }

  } catch (error) {
    console.error('Erro ao chamar a API:', error);
    res.status(500).json({ reply: 'Jesus: Houve um erro ao processar sua pergunta.' });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
