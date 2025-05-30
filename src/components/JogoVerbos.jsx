import React, { useState } from 'react';
import './JogoVerbos.css';
import verbos from '../data/verbos';
import banner from '../assets/banner_ingles.png';

export function Button({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`custom-button ${className}`}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={`custom-card ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`custom-card-content ${className}`}>{children}</div>;
}

const todosTempos = ['presente', 'passado', 'particípio'];
const niveis = ['fácil', 'médio', 'difícil', 'muito difícil'];
const modosDica = ['tranquila', 'rigorosa'];

export default function JogoVerbos() {
  const [jogoComecou, setJogoComecou] = useState(false);
  const [verboAtual, setVerboAtual] = useState(null);
  const [tempoAtual, setTempoAtual] = useState('');
  const [resposta, setResposta] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [nivelDica, setNivelDica] = useState(0);
  const [dica, setDica] = useState('');
  const [acertos, setAcertos] = useState(0);
  const [temposSelecionados, setTemposSelecionados] = useState(todosTempos);
  const [nivelSelecionado, setNivelSelecionado] = useState('fácil');
  const [verbosSorteados, setVerbosSorteados] = useState([]);
  const [modoDicaSelecionado, setModoDicaSelecionado] = useState('tranquila');
  const [dicaRigorosa, setDicaRigorosa] = useState('');
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [mostrarProxima, setMostrarProxima] = useState(false);
  const [audioDisponivel, setAudioDisponivel] = useState(false);

  const getVerbosPorNivel = () => {
    if (nivelSelecionado === 'fácil') return verbos.slice(0, 30);
    if (nivelSelecionado === 'médio') return verbos.slice(0, 65);
    if (nivelSelecionado === 'difícil') return verbos.slice(0, 100);
    return verbos;
  };

  const verbosSelecionados = getVerbosPorNivel();
  const totalPalavras = verbosSelecionados.length * temposSelecionados.length;

  const iniciarJogo = () => {
    if (temposSelecionados.length === 0) {
      alert('Selecione pelo menos um tempo verbal para praticar.');
      return;
    }
    setVerbosSorteados([]);  // Resetar a lista de verbos sorteados
    sortearVerbo();
    setJogoComecou(true);
    setMensagem('');
    setAcertos(0);
  };

  const sortearVerbo = () => {
    const combinacoes = [];
  
    verbosSelecionados.forEach((verbo) => {
      temposSelecionados.forEach((tempo) => {
        combinacoes.push({ verbo, tempo });
      });
    });
  
    const combinacoesRestantes = combinacoes.filter(
      (combo) =>
        !verbosSorteados.some(
          (sorteado) =>
            sorteado.verbo.pt === combo.verbo.pt && sorteado.tempo === combo.tempo
        )
    );
  
    if (combinacoesRestantes.length === 0) {
      setJogoFinalizado(true);
      return;
    }
  
    const sorteada = combinacoesRestantes[Math.floor(Math.random() * combinacoesRestantes.length)];
  
    setVerbosSorteados((prev) => [...prev, sorteada]);
    setVerboAtual(sorteada.verbo);
    setTempoAtual(sorteada.tempo);
    setResposta('');
    setMensagem('');
    setNivelDica(0);
    setDica('');
    setDicaRigorosa('');
    setAudioDisponivel(false);
  };

  const verificarResposta = () => {
    if (!verboAtual) return;
    const respostaCorreta = verboAtual[tempoAtual].toLowerCase();
    const tentativa = resposta.trim().toLowerCase();
  
    if (tentativa === respostaCorreta) {
      setMensagem('✅ Correto! Clique em "Próxima" para continuar.');
      setAcertos((prev) => prev + 1);
      setMostrarProxima(true);
      setAudioDisponivel(true);
    } else {
      // Verificar o modo de dica
      if (modoDicaSelecionado === 'tranquila') {
        const novaDica = respostaCorreta.slice(0, Math.min(nivelDica + 1, respostaCorreta.length));
        setNivelDica((prev) => Math.min(prev + 1, respostaCorreta.length));
        setDica(`DICA: ${novaDica}`);
      } else if (modoDicaSelecionado === 'rigorosa') {
        let dicaParcial = dicaRigorosa || '_ '.repeat(respostaCorreta.length).trim();
  
        let novaDica = '';
        for (let i = 0; i < respostaCorreta.length; i++) {
          if (tentativa[i] === respostaCorreta[i]) {
            novaDica += respostaCorreta[i] + ' ';
          } else {
            novaDica += dicaParcial[i * 2] + ' ';
          }
        }
  
        setDica(`DICA: ${novaDica.trim()}`);
        setDicaRigorosa(novaDica.trim());
      }
  
      setMensagem('❌ Errado. Tente novamente.');
    }
  };

  const proximaPalavra = () => {
    sortearVerbo();
    setResposta('');
    setMensagem('');
    setDica('');
    setNivelDica(0);
    setDicaRigorosa('');
    setMostrarProxima(false);
  };

  const tocarAudio = () => {
    const arquivo = verboAtual.audio?.[tempoAtual];
  
    if (arquivo) {
      console.log('🔊 Tentando tocar o áudio:', arquivo); // Mostra o caminho no console
      const audio = new Audio(arquivo);
      audio.play().catch((err) => {
        console.error('❌ Erro ao tocar áudio:', err);
        alert('Erro ao tentar tocar o áudio.');
      });
    } else {
      alert('Áudio não disponível.');
    }
  };

  const alternarTempo = (tempo) => {
    setTemposSelecionados((prev) =>
      prev.includes(tempo)
        ? prev.filter((t) => t !== tempo)
        : [...prev, tempo]
    );
  };

  if (jogoFinalizado) {
    return (
      <div className="container">
        <Card>
          <CardContent>
            <img src={banner} alt="Logo do site" className="logo" />
            <h1 className="titulo">🎉 Parabéns! 🎉</h1>
            <p className="descricao">Você concluiu todas as {totalPalavras} palavras da sua dificuldade!</p>
            <Button onClick={() => {
              setJogoFinalizado(false);
              setJogoComecou(false);
              setVerbosSorteados([]); 
              setAcertos(0);
              setMensagem('');
              setDica('');
              setNivelDica(0);
            }}>
              Voltar para o início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container">
      {!jogoComecou ? (
        <Card>
          <CardContent>
            <img src={banner} alt="Logo do site" className="logo" />
            <h1 className="titulo">Treinador de Verbos Irregulares</h1>
  
            <div className="configuracoes-container">
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
            </div>
            
            <Button onClick={iniciarJogo}>Play</Button>
          </CardContent>
        </Card>
      ) : (
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

            {/* Container para os dois botões */}
            <div className="botoes-container">
              {!mostrarProxima ? (
                <Button onClick={verificarResposta}>Verificar</Button>
              ) : (
                <Button onClick={proximaPalavra}>Próxima</Button>
              )}
              <Button onClick={() => {
                setJogoComecou(false);
                setMostrarProxima(false);
                setAudioDisponivel(false);
                setVerbosSorteados([]);
                setVerboAtual(null);
                setTempoAtual('');
                setResposta('');
                setMensagem('');
                setNivelDica(0);
                setDica('');
                setDicaRigorosa('');
                setAcertos(0);
                setJogoFinalizado(false);
              }} className="reiniciar-button">
                Reiniciar
              </Button>
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
      )}
    </div>
  );
}
