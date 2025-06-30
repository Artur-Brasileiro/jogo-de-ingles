import React, { useState } from 'react';
import './JogoVerbos.css';
import verbos from '../data/verbos';
import banner from '../assets/banner_ingles.png';
import { Button, Card, CardContent } from './UIComponents';
import { TelaInicial } from './TelaInicial';
import { JogoArea } from './JogoArea';

const todosTempos = ['presente', 'passado', 'particípio'];

export default function JogoVerbos() {
  // Estados principais
  const [jogoComecou, setJogoComecou] = useState(false);
  const [verboAtual, setVerboAtual] = useState(null);
  const [tempoAtual, setTempoAtual] = useState('');
  const [resposta, setResposta] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [nivelDica, setNivelDica] = useState(0);
  const [dica, setDica] = useState('');
  const [dicaRigorosa, setDicaRigorosa] = useState('');
  const [acertos, setAcertos] = useState(0);
  const [temposSelecionados, setTemposSelecionados] = useState(todosTempos);
  const [nivelSelecionado, setNivelSelecionado] = useState('fácil');
  const [modoDicaSelecionado, setModoDicaSelecionado] = useState('tranquila');
  const [verbosSorteados, setVerbosSorteados] = useState([]);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [mostrarProxima, setMostrarProxima] = useState(false);
  const [audioDisponivel, setAudioDisponivel] = useState(false);

  // Filtrar verbos por nível
  const getVerbosPorNivel = () => {
    if (nivelSelecionado === 'fácil') return verbos.slice(0, 38);
    if (nivelSelecionado === 'médio') return verbos.slice(0, 91);
    if (nivelSelecionado === 'difícil') return verbos.slice(0, 114);
    return verbos;
  };

  const verbosSelecionados = getVerbosPorNivel();
  const totalPalavras = verbosSelecionados.length * temposSelecionados.length;

  // Iniciar jogo
  const iniciarJogo = () => {
    if (temposSelecionados.length === 0) {
      alert('Selecione pelo menos um tempo verbal para praticar.');
      return;
    }
    setVerbosSorteados([]);
    sortearVerbo();
    setJogoComecou(true);
    setMensagem('');
    setAcertos(0);
  };

  // Sortear próximo verbo
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
          (s) => s.verbo.pt === combo.verbo.pt && s.tempo === combo.tempo
        )
    );

    if (combinacoesRestantes.length === 0) {
      setJogoFinalizado(true);
      return;
    }

    const escolha = combinacoesRestantes[
      Math.floor(Math.random() * combinacoesRestantes.length)
    ];
    setVerbosSorteados((prev) => [...prev, escolha]);
    setVerboAtual(escolha.verbo);
    setTempoAtual(escolha.tempo);
    setResposta('');
    setMensagem('');
    setNivelDica(0);
    setDica('');
    setDicaRigorosa('');
    setAudioDisponivel(false);
  };

  // Verificar resposta do usuário
  const verificarResposta = () => {
    if (!verboAtual) return;
    const correta = verboAtual[tempoAtual].toLowerCase();
    const tentativa = resposta.trim().toLowerCase();

    if (tentativa === correta) {
      setMensagem('✅ Correto! Clique em "Próxima" para continuar.');
      setAcertos((prev) => prev + 1);
      setMostrarProxima(true);
      setAudioDisponivel(true);
    } else {
      // Aplicar dica conforme modo selecionado
      if (modoDicaSelecionado === 'tranquila') {
        const nova = correta.slice(0, Math.min(nivelDica + 1, correta.length));
        setNivelDica((prev) => Math.min(prev + 1, correta.length));
        setDica(`DICA: ${nova}`);
      } else {
        let base = dicaRigorosa || '_ '.repeat(correta.length).trim();
        let parcial = '';
        for (let i = 0; i < correta.length; i++) {
          parcial +=
            tentativa[i] === correta[i] ? correta[i] + ' ' : base[i * 2] + ' ';
        }
        setDica(`DICA: ${parcial.trim()}`);
        setDicaRigorosa(parcial.trim());
      }
      setMensagem('❌ Errado. Tente novamente.');
    }
  };

  // Próxima palavra
  const proximaPalavra = () => {
    sortearVerbo();
    setMostrarProxima(false);
  };

  // Tocar áudio
  const tocarAudio = () => {
    const arquivo = verboAtual.audio?.[tempoAtual];
    if (arquivo) {
      new Audio(arquivo).play().catch(() => alert('Erro ao tentar tocar o áudio.'));
    } else {
      alert('Áudio não disponível.');
    }
  };

  // Alternar seleção de tempo verbal
  const alternarTempo = (tempo) => {
    setTemposSelecionados((prev) =>
      prev.includes(tempo) ? prev.filter((t) => t !== tempo) : [...prev, tempo]
    );
  };

  // Reiniciar jogo
  const reiniciarJogo = () => {
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
  };

  // Tela de finalização
  if (jogoFinalizado) {
    return (
      <div className="container">
        <Card>
          <CardContent>
            <img src={banner} alt="Logo do site" className="logo" />
            <h1 className="titulo">🎉 Parabéns! 🎉</h1>
            <p className="descricao">
              Você concluiu todas as {totalPalavras} palavras da sua dificuldade!
            </p>
            <Button onClick={reiniciarJogo}>Voltar para o início</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render principal: tela inicial ou área do jogo
  return (
    <div className="container">
      {!jogoComecou ? (
        <TelaInicial
          temposSelecionados={temposSelecionados}
          alternarTempo={alternarTempo}
          nivelSelecionado={nivelSelecionado}
          setNivelSelecionado={setNivelSelecionado}
          modoDicaSelecionado={modoDicaSelecionado}
          setModoDicaSelecionado={setModoDicaSelecionado}
          iniciarJogo={iniciarJogo}
        />
      ) : (
        <JogoArea
          verboAtual={verboAtual}
          tempoAtual={tempoAtual}
          resposta={resposta}
          setResposta={setResposta}
          verificarResposta={verificarResposta}
          mostrarProxima={mostrarProxima}
          proximaPalavra={proximaPalavra}
          mensagem={mensagem}
          dica={dica}
          tocarAudio={tocarAudio}
          audioDisponivel={audioDisponivel}
          reiniciarJogo={reiniciarJogo}
          verbosSorteados={verbosSorteados}
          totalPalavras={totalPalavras}
        />
      )}
    </div>
  );
}
