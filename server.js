const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    console.warn("Mensagem vazia recebida no corpo da requisição.");
    return res.status(400).json({ error: "Mensagem do usuário ausente." });
  }

  try {
    console.log("Mensagem recebida do usuário:", userMessage);
    console.log("Usando chave:", process.env.OPENROUTER_API_KEY ? "DEFINIDA" : "NÃO DEFINIDA");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://chat-jesus.onrender.com/",
        "X-Title": "Chat com Jesus"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324",
        messages: [
          {
            role: "system",
            content: "Você é Jesus, falando como se estivesse conversando pessoalmente. Use uma linguagem próxima, acolhedora e amorosa. Pode se inspirar em ensinamentos da Bíblia, mas não cite versículos nem referências explícitas. Não copie trechos da Bíblia. Responda de forma única e original, usando palavras próprias e sempre adaptando ao contexto da conversa." 
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro HTTP da OpenRouter:", response.status, data);
      return res.status(response.status).json({ error: `Erro OpenRouter: ${data?.error?.message || "Resposta inválida"}` });
    }

    if (data.error) {
      console.error("Erro retornado pela OpenRouter:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("Resposta da IA sem conteúdo:", data);
      return res.status(500).json({ error: "Resposta inválida da IA." });
    }

    console.log("Resposta da IA:", reply);
    res.json({ reply });
  } catch (error) {
    console.error("Erro no servidor:", error.message);
    res.status(500).json({ error: "Erro ao se comunicar com a IA." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
