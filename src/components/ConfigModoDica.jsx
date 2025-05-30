// ConfigModoDica.jsx
const modosDica = ['tranquila', 'rigorosa'];

export function ConfigModoDica({ modoDicaSelecionado, setModoDicaSelecionado }) {
  return (
    <div className="checkbox-container">
      <h4>💡 Configuração de Dicas:</h4>
      <div className="checkbox-labels">
        {modosDica.map((modo) => (
          <label key={modo} className="checkbox-label">
            <input
              type="radio"
              name="modoDica"
              checked={modoDicaSelecionado === modo}
              onChange={() => setModoDicaSelecionado(modo)}
            />
            {modo.charAt(0).toUpperCase() + modo.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
}