require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/message', async (req, res) => {
  const message = req.body.message;
  console.log("Mensagem recebida:", message);

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    console.error("❌ API key não definida.");
    return res.status(500).json({ error: "API key não configurada." });
  }

  console.log("Usando chave:", apiKey ? "DEFINIDA" : "NÃO DEFINIDA");

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Referer': 'https://chat-jesus.onrender.com/',
        'X-Title': 'Chat com Jesus'
      },
      body: JSON.stringify({
        model: 'deepseek-ai/deepseek-v3',
        messages: [
          {
            role: 'system',
            content: 'Você é Jesus e responderá com sabedoria, compaixão e amor incondicional.'
          },
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    console.log("Resposta da OpenRouter:", JSON.stringify(data, null, 2));

    if (data.error) {
      throw new Error(data.error.message || "Erro desconhecido da API");
    }

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      throw new Error("Resposta inválida da IA");
    }

    res.json({ reply });
  } catch (error) {
    console.error("❌ Erro ao responder:", error);
    res.status(500).json({ error: "Jesus: Ocorreu um erro ao interpretar a resposta" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
