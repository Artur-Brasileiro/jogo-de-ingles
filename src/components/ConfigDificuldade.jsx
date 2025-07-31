// ConfigDificuldade.jsx
const niveis = ['fácil', 'médio', 'difícil', 'muito difícil'];

export function ConfigDificuldade({ nivelSelecionado, setNivelSelecionado }) {
  return (
    <div className="checkbox-container">
      <h4>📈 Escolha a dificuldade:</h4>
      <div className="checkbox-labels">
        {niveis.map((nivel) => (
          <label key={nivel} className="checkbox-label">
            <input
              type="radio"
              name="nivel"
              checked={nivelSelecionado === nivel}
              onChange={() => setNivelSelecionado(nivel)}
            />
            {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
}