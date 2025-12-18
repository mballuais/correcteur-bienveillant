const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Serveur correcteur bienveillant actif !' });
});

app.post('/api/correct', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Le texte est vide' });
    }

    if (text.length > 2000) {
      return res.status(400).json({ error: 'Le texte dépasse 2000 caractères' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    const prompt = `Tu es un professeur de français expert et bienveillant. Ta tâche est de corriger le texte suivant. Tu dois impérativement renvoyer la réponse au format JSON (sans Markdown) respectant cette structure exacte :

{
  "corrected_text": "Le texte entièrement corrigé ici…",
  "explanations": [
    {
      "error": "Le mot ou segment fautif original",
      "correction": "La correction apportée",
      "rule": "L'explication pédagogique simple de la règle (grammaire/syntaxe)."
    }
  ]
}

Si aucune faute n'est trouvée, le tableau 'explanations' doit être vide.

Texte à corriger : ${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    const jsonResponse = JSON.parse(textResponse);

    res.json(jsonResponse);

  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Service momentanément indisponible' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});