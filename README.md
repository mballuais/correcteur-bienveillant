# 📝 Le Correcteur Bienveillant

Application web de correction grammaticale assistée par IA (Google Gemini), développée dans le cadre du projet "Gemini Enhanced" à Normandie Web School.

## 🎯 Objectif

Fournir une correction grammaticale et syntaxique accompagnée d'explications pédagogiques pour aider l'utilisateur à comprendre ses erreurs.

## 🛠️ Stack Technique

- **Frontend** : React.js
- **Backend** : Node.js / Express
- **IA** : API Google Gemini (gemini-flash-latest)
- **Gestion d'environnement** : dotenv

## 📋 Prérequis

- Node.js (v18 ou supérieur)
- npm
- Une clé API Google Gemini

## 🔧 Installation

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd correcteur-bienveillant
```

### 2. Installation du Backend
```bash
cd server
npm install
```

### 3. Configuration de la clé API

Créer un fichier `.env` dans le dossier `server` :
```bash
GEMINI_API_KEY=votre_clé_api_ici
```

**Obtenir une clé API :**
1. Aller sur [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Cliquer sur "Create API key in new project"
3. Copier la clé (commence par `AIza...`)

### 4. Installation du Frontend
```bash
cd ../client
npm install
```

## 🚀 Lancement de l'application

### Terminal 1 - Lancer le serveur Backend
```bash
cd server
node index.js
```

Le serveur démarre sur `http://localhost:3001`

### Terminal 2 - Lancer le client React
```bash
cd client
npm start
```

L'application s'ouvre automatiquement sur `http://localhost:3000`

## 📱 Fonctionnalités

### MVP (Version actuelle)

- ✅ Saisie de texte avec limite de 2000 caractères
- ✅ Compteur de caractères en temps réel
- ✅ Correction grammaticale et syntaxique
- ✅ Explications pédagogiques détaillées pour chaque erreur
- ✅ Interface responsive (mobile/desktop)
- ✅ Gestion des erreurs API

## 🏗️ Architecture
```
correcteur-bienveillant/
├── server/
│   ├── index.js          # Serveur Express + API Gemini
│   ├── .env              # Clé API (non versionné)
│   └── package.json
└── client/
    ├── src/
    │   ├── App.js        # Composant principal React
    │   ├── App.css       # Styles
    │   └── index.js
    └── package.json
```

## 🔒 Sécurité

⚠️ **Important** : La clé API ne doit **JAMAIS** être exposée côté client. Elle reste sur le serveur backend dans le fichier `.env`.

## 👨‍💻 Auteur

Matteo - Normandie Web School - Décembre 2025
