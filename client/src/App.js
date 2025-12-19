import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const MAX_CHARS = 2000;

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:3001/api/correct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Une erreur est survenue');
      }
    } catch (err) {
      setError('Service momentanément indisponible');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText('');
    setResult(null);
    setError('');
  };

  return (
    <div className="App">
      <header>
        <h1> Le Correcteur Bienveillant</h1>
        <p>Corrigez vos textes et comprenez vos erreurs</p>
      </header>

      <main>
        {!result ? (
          <div className="input-section">
            <textarea
              value={text}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARS) {
                  setText(e.target.value);
                }
              }}
              placeholder="Collez votre texte ici..."
              disabled={loading}
            />
            <div className="counter">{text.length}/{MAX_CHARS}</div>
            
            {error && <div className="error-banner">{error}</div>}

            <button 
              onClick={handleSubmit} 
              disabled={!text.trim() || loading}
              className="btn-primary"
            >
              {loading ? ' Analyse en cours...' : ' Corriger et Expliquer'}
            </button>
          </div>
        ) : (
          <div className="result-section">
            <div className="corrected-text">
              <h2> Texte corrigé</h2>
              <p>{result.corrected_text}</p>
            </div>

            <div className="explanations">
              <h2> Explications pédagogiques</h2>
              {result.explanations.length === 0 ? (
                <p className="no-errors">✅ Aucune erreur détectée ! Bravo !</p>
              ) : (
                result.explanations.map((exp, index) => (
                  <div key={index} className="card">
                    <div className="card-error">
                      <span className="badge error-badge">Erreur</span>
                      <span className="strikethrough">{exp.error}</span>
                    </div>
                    <div className="arrow">→</div>
                    <div className="card-correction">
                      <span className="badge correction-badge">Correction</span>
                      <span className="highlight">{exp.correction}</span>
                    </div>
                    <div className="card-rule">
                      <strong> Règle :</strong> {exp.rule}
                    </div>
                  </div>
                ))
              )}
            </div>

            <button onClick={handleReset} className="btn-secondary">
              ↺ Nouvelle correction
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
