// ConfigTempoVerbal.jsx
export function ConfigTempoVerbal({ temposSelecionados, alternarTempo }) {
  const todosTempos = ['presente', 'passado', 'particípio'];

  return (
    <div className="checkbox-container">
      <h4>⚙️ Escolha os tempos verbais:</h4>
      <div className="checkbox-labels">
        {todosTempos.map((tempo) => (
          <label key={tempo} className="checkbox-label">
            <input
              type="checkbox"
              checked={temposSelecionados.includes(tempo)}
              onChange={() => alternarTempo(tempo)}
            />
            {tempo.charAt(0).toUpperCase() + tempo.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
}