const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
  const message = req.body.message;
  console.log('Mensagem recebida:', message);

  if (!OPENROUTER_API_KEY) {
    console.error('Chave da OpenRouter não definida');
    return res.status(500).json({ error: 'Chave da OpenRouter não definida' });
  }

  console.log('Usando chave:', OPENROUTER_API_KEY ? 'DEFINIDA' : 'NÃO DEFINIDA');

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-ai/deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'Você é Jesus. Responda sempre com compaixão, amor e sabedoria, como um guia espiritual que oferece conforto e direção.'
          },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();
    console.log('Resposta da OpenRouter:', JSON.stringify(data, null, 2));

    if (data.choices && data.choices.length > 0) {
      const reply = data.choices[0].message.content;
      res.json({ reply });
    } else {
      res.json({ reply: 'Jesus: Ocorreu um erro ao interpretar a resposta.' });
    }

  } catch (error) {
    console.error('Erro ao se comunicar com OpenRouter:', error);
    res.status(500).json({ error: 'Erro ao se comunicar com OpenRouter' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
