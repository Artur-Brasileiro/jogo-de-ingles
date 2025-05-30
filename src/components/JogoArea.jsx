// JogoArea.jsx
import { Button, Card, CardContent } from './UIComponents'; // ou onde você salvou os básicos
import banner from '../assets/banner_ingles.png';

export function JogoArea({
  verboAtual,
  tempoAtual,
  resposta,
  setResposta,
  verificarResposta,
  mostrarProxima,
  proximaPalavra,
  mensagem,
  dica,
  tocarAudio,
  audioDisponivel,
  reiniciarJogo,
  verbosSorteados,
  totalPalavras,
}) {
  return (
    <Card>
      <CardContent>
        <img src={banner} alt="Logo do site" className="logo" />
        <p className="contador">{verbosSorteados.length} / {totalPalavras} palavras</p>
        <h2 className="titulo">Tradução: {verboAtual?.pt}</h2>
        <p className="tempo">Digite no tempo: <strong>{tempoAtual}</strong></p>
        <input
          type="text"
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !mostrarProxima) {
              verificarResposta();
            }
          }}
          className="campo-texto"
        />

        <div className="botoes-container">
          {!mostrarProxima ? (
            <Button onClick={verificarResposta}>Verificar</Button>
          ) : (
            <Button onClick={proximaPalavra}>Próxima</Button>
          )}
          <Button onClick={reiniciarJogo} className="reiniciar-button">Reiniciar</Button>
          <Button 
            onClick={tocarAudio} 
            className={`audio-button ${!audioDisponivel ? 'disabled' : ''}`}
            disabled={!audioDisponivel}
          >
            📢 Ouvir
          </Button>
        </div>

        {mensagem && <p className="mensagem">{mensagem}</p>}
        {dica && <p className="dica">{dica}</p>}
      </CardContent>
    </Card>
  );
}