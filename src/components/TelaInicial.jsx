// TelaInicial.jsx
import { Button, Card, CardContent } from './UIComponents';
import banner from '../assets/banner_ingles.png';
import { ConfigTempoVerbal } from './ConfigTempoVerbal';
import { ConfigDificuldade } from './ConfigDificuldade';
import { ConfigModoDica } from './ConfigModoDica';

export function TelaInicial({
  temposSelecionados,
  alternarTempo,
  nivelSelecionado,
  setNivelSelecionado,
  modoDicaSelecionado,
  setModoDicaSelecionado,
  iniciarJogo,
}) {
  return (
    <Card>
      <CardContent>
        <img src={banner} alt="Logo do site" className="logo" />
        <h1 className="titulo">Treinador de Verbos Irregulares</h1>

        <div className="configuracoes-container">
          <ConfigTempoVerbal temposSelecionados={temposSelecionados} alternarTempo={alternarTempo} />
          <ConfigDificuldade nivelSelecionado={nivelSelecionado} setNivelSelecionado={setNivelSelecionado} />
          <ConfigModoDica modoDicaSelecionado={modoDicaSelecionado} setModoDicaSelecionado={setModoDicaSelecionado} />
        </div>

        <Button onClick={iniciarJogo}>Play</Button>
      </CardContent>
    </Card>
  );
}