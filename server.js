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
  console.log("Usando chave:", process.env.OPENROUTER_API_KEY ? "DEFINIDA" : "NÃO DEFINIDA");

  try {
    const
