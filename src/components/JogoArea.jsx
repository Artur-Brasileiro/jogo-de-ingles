// JogoArea.jsx
import React, { useRef, useEffect } from 'react';
import { Button, Card, CardContent } from './UIComponents';
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
  // Refs para input e botão
  const inputRef = useRef(null);
  const nextButtonRef = useRef(null);

  // Foca no botão 'Próxima' quando ele aparece
  useEffect(() => {
    if (mostrarProxima) {
      nextButtonRef.current?.focus();
    }
  }, [mostrarProxima]);

  // Foca no input sempre que um novo verbo é sorteado
  useEffect(() => {
    if (verboAtual && !mostrarProxima) {
      inputRef.current?.focus();
    }
  }, [verboAtual, mostrarProxima]);

  return (
    <Card>
      <CardContent>
        <img src={banner} alt="Logo do site" className="logo" />
        <p className="contador">{verbosSorteados.length} / {totalPalavras} palavras</p>
        <h2 className="titulo">Tradução: {verboAtual?.pt}</h2>
        <p className="tempo">Digite no tempo: <strong>{tempoAtual}</strong></p>
        <input
          ref={inputRef}
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
            <Button ref={nextButtonRef} onClick={proximaPalavra}>Próxima</Button>
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
