const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  console.log("Mensagem recebida:", message);
  console.log("Usando chave:", process.env.DEEPSEEK_API_KEY ? "DEFINIDA" : "NÃO DEFINIDA");

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "Você é Jesus Cristo. Responda com sabedoria, empatia e amor." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    console.log("Resposta da DeepSeek:", data);

    const reply = data.choices?.[0]?.message?.content || "Erro ao interpretar a resposta.";
    res.json({ reply });

  } catch (err) {
    console.error("Erro ao chamar a API da DeepSeek:", err);
    res.status(500).json({ reply: "Erro interno no servidor. Por favor, tente novamente mais tarde." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta", PORT));
