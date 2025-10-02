import { useState, useMemo } from 'react';

// --- TIPOS E DADOS ---

// Definindo a estrutura de um verbo com TypeScript
interface Verb {
  pt: string;
  presente: string;
  passado: string;
  particípio: string;
}

interface PhrasalVerb {
  phrasal: string;
  meaning: string;
}

type Difficulty = 'facil' | 'medio' | 'dificil' | 'muito-dificil';
type Tense = 'presente' | 'passado' | 'particípio';

// Lista MESTRA com todos os verbos
const todosOsVerbos: Verb[] = [
    { pt: 'beber', presente: 'drink', passado: 'drank', particípio: 'drunk'},
    { pt: 'comer', presente: 'eat', passado: 'ate', particípio: 'eaten'},
    { pt: 'ir', presente: 'go', passado: 'went', particípio: 'gone'},
    { pt: 'ver', presente: 'see', passado: 'saw', particípio: 'seen'},
    { pt: 'escrever', presente: 'write', passado: 'wrote', particípio: 'written'},
    { pt: 'quebrar', presente: 'break', passado: 'broke', particípio: 'broken'},
    { pt: 'trazer', presente: 'bring', passado: 'brought', particípio: 'brought'},
    { pt: 'manter', presente: 'keep', passado: 'kept', particípio: 'kept' },
    { pt: 'significar', presente: 'mean', passado: 'meant', particípio: 'meant' },
    { pt: 'obter/conseguir', presente: 'get', passado: 'got', particípio: 'gotten' },
    { pt: 'correr', presente: 'run', passado: 'ran', particípio: 'run' },
    { pt: 'dizer', presente: 'say', passado: 'said', particípio: 'said' },
    { pt: 'falar', presente: 'speak', passado: 'spoke', particípio: 'spoken' },
    { pt: 'colocar', presente: 'put', passado: 'put', particípio: 'put' },
    { pt: 'pegar', presente: 'take', passado: 'took', particípio: 'taken' },
    { pt: 'fazer', presente: 'do', passado: 'did', particípio: 'done' },
    { pt: 'ter', presente: 'have', passado: 'had', particípio: 'had' },
    { pt: 'dar', presente: 'give', passado: 'gave', particípio: 'given' },
    { pt: 'sentir', presente: 'feel', passado: 'felt', particípio: 'felt' },
    { pt: 'achar', presente: 'find', passado: 'found', particípio: 'found' },
    { pt: 'começar', presente: 'begin', passado: 'began', particípio: 'begun' },
    { pt: 'pensar', presente: 'think', passado: 'thought', particípio: 'thought' },
    { pt: 'deixar', presente: 'leave', passado: 'left', particípio: 'left' },
    { pt: 'perder', presente: 'lose', passado: 'lost', particípio: 'lost' },
    { pt: 'fazer/criar', presente: 'make', passado: 'made', particípio: 'made' },
    { pt: 'contar (narrar)', presente: 'tell', passado: 'told', particípio: 'told' },
    { pt: 'segurar', presente: 'hold', passado: 'held', particípio: 'held' },
    { pt: 'vir', presente: 'come', passado: 'came', particípio: 'come' },
    { pt: 'saber/conhecer', presente: 'know', passado: 'knew', particípio: 'known' },
    { pt: 'tornar-se', presente: 'become', passado: 'became', particípio: 'become' },
    { pt: 'levar', presente: 'take', passado: 'took', particípio: 'taken' },
    { pt: 'alimentar', presente: 'feed', passado: 'fed', particípio: 'fed' },
    { pt: 'procurar/buscar', presente: 'seek', passado: 'sought', particípio: 'sought' },
    { pt: 'sacudir', presente: 'shake', passado: 'shook', particípio: 'shaken' },
    { pt: 'cheirar', presente: 'smell', passado: 'smelt', particípio: 'smelt' },
    { pt: 'afundar', presente: 'sink', passado: 'sank', particípio: 'sunk' },
    { pt: 'chorar', presente: 'weep', passado: 'wept', particípio: 'wept' },
    { pt: 'deitar', presente: 'lay', passado: 'laid', particípio: 'laid' },
    { pt: 'ser/estar', presente: 'be', passado: 'was/were', particípio: 'been' },
    { pt: 'bater', presente: 'beat', passado: 'beat', particípio: 'beaten' },
    { pt: 'morder', presente: 'bite', passado: 'bit', particípio: 'bitten' },
    { pt: 'comprar', presente: 'buy', passado: 'bought', particípio: 'bought' },
    { pt: 'soprar', presente: 'blow', passado: 'blew', particípio: 'blown' },
    { pt: 'construir', presente: 'build', passado: 'built', particípio: 'built' },
    { pt: 'pegar/apanhar', presente: 'catch', passado: 'caught', particípio: 'caught' },
    { pt: 'escolher', presente: 'choose', passado: 'chose', particípio: 'chosen' },
    { pt: 'cortar', presente: 'cut', passado: 'cut', particípio: 'cut' },
    { pt: 'custar', presente: 'cost', passado: 'cost', particípio: 'cost' },
    { pt: 'desenhar', presente: 'draw', passado: 'drew', particípio: 'drawn' },
    { pt: 'dirigir', presente: 'drive', passado: 'drove', particípio: 'driven' },
    { pt: 'cair', presente: 'fall', passado: 'fell', particípio: 'fallen' },
    { pt: 'lutar/brigar', presente: 'fight', passado: 'fought', particípio: 'fought' },
    { pt: 'voar', presente: 'fly', passado: 'flew', particípio: 'flown' },
    { pt: 'esquecer', presente: 'forget', passado: 'forgot', particípio: 'forgotten' },
    { pt: 'crescer', presente: 'grow', passado: 'grew', particípio: 'grown' },
    { pt: 'pendurar', presente: 'hang', passado: 'hung', particípio: 'hung' },
    { pt: 'ouvir', presente: 'hear', passado: 'heard', particípio: 'heard' },
    { pt: 'esconder', presente: 'hide', passado: 'hid', particípio: 'hidden' },
    { pt: 'bater (em algo)', presente: 'hit', passado: 'hit', particípio: 'hit' },
    { pt: 'ferir', presente: 'hurt', passado: 'hurt', particípio: 'hurt' },
    { pt: 'emprestar', presente: 'lend', passado: 'lent', particípio: 'lent' },
    { pt: 'permitir', presente: 'let', passado: 'let', particípio: 'let' },
    { pt: 'mentir', presente: 'lie', passado: 'lay', particípio: 'lain' },
    { pt: 'iluminar', presente: 'light', passado: 'lit', particípio: 'lit' },
    { pt: 'encontrar', presente: 'meet', passado: 'met', particípio: 'met' },
    { pt: 'pagar', presente: 'pay', passado: 'paid', particípio: 'paid' },
    { pt: 'ler', presente: 'read', passado: 'read', particípio: 'read' },
    { pt: 'andar de cavalo', presente: 'ride', passado: 'rode', particípio: 'ridden' },
    { pt: 'tocar', presente: 'ring', passado: 'rang', particípio: 'rung' },
    { pt: 'levantar', presente: 'rise', passado: 'rose', particípio: 'risen' },
    { pt: 'vender', presente: 'sell', passado: 'sold', particípio: 'sold' },
    { pt: 'enviar', presente: 'send', passado: 'sent', particípio: 'sent' },
    { pt: 'brilhar', presente: 'shine', passado: 'shone', particípio: 'shone' },
    { pt: 'atirar', presente: 'shoot', passado: 'shot', particípio: 'shot' },
    { pt: 'mostrar', presente: 'show', passado: 'showed', particípio: 'shown' },
    { pt: 'fechar', presente: 'shut', passado: 'shut', particípio: 'shut' },
    { pt: 'cantar', presente: 'sing', passado: 'sang', particípio: 'sung' },
    { pt: 'sentar', presente: 'sit', passado: 'sat', particípio: 'sat' },
    { pt: 'dormir', presente: 'sleep', passado: 'slept', particípio: 'slept' },
    { pt: 'gastar', presente: 'spend', passado: 'spent', particípio: 'spent' },
    { pt: 'ficar de pé', presente: 'stand', passado: 'stood', particípio: 'stood' },
    { pt: 'roubar', presente: 'steal', passado: 'stole', particípio: 'stolen' },
    { pt: 'nadar', presente: 'swim', passado: 'swam', particípio: 'swum' },
    { pt: 'ensinar', presente: 'teach', passado: 'taught', particípio: 'taught' },
    { pt: 'rasgar', presente: 'tear', passado: 'tore', particípio: 'torn' },
    { pt: 'lançar', presente: 'throw', passado: 'threw', particípio: 'thrown' },
    { pt: 'entender', presente: 'understand', passado: 'understood', particípio: 'understood' },
    { pt: 'acordar', presente: 'wake', passado: 'woke', particípio: 'woken' },
    { pt: 'vestir', presente: 'wear', passado: 'wore', particípio: 'worn' },
    { pt: 'ganhar', presente: 'win', passado: 'won', particípio: 'won' },
    { pt: 'liderar', presente: 'lead', passado: 'led', particípio: 'led' },
    { pt: 'escorregar', presente: 'slide', passado: 'slid', particípio: 'slid' },
    { pt: 'dividir/rachar', presente: 'split', passado: 'split', particípio: 'split' },
    { pt: 'espalhar', presente: 'spread', passado: 'spread', particípio: 'spread' },
    { pt: 'jurar', presente: 'swear', passado: 'swore', particípio: 'sworn' },
    { pt: 'balançar', presente: 'swing', passado: 'swung', particípio: 'swung' },
    { pt: 'pisar', presente: 'tread', passado: 'trod', particípio: 'trodden' },
    { pt: 'entortar', presente: 'bend', passado: 'bent', particípio: 'bent' },
    { pt: 'apostar', presente: 'bet', passado: 'bet', particípio: 'bet' },
    { pt: 'surgir', presente: 'arise', passado: 'arose', particípio: 'arisen' },
    { pt: 'despertar', presente: 'awake', passado: 'awoke', particípio: 'awoken' },
    { pt: 'suportar/carregar', presente: 'bear', passado: 'bore', particípio: 'borne' },
    { pt: 'amarrar', presente: 'bind', passado: 'bound', particípio: 'bound' },
    { pt: 'criar (animais)', presente: 'breed', passado: 'bred', particípio: 'bred' },
    { pt: 'agarrar-se', presente: 'cling', passado: 'clung', particípio: 'clung' },
    { pt: 'rastejar', presente: 'creep', passado: 'crept', particípio: 'crept' },
    { pt: 'lidar', presente: 'deal', passado: 'dealt', particípio: 'dealt' },
    { pt: 'cavar', presente: 'dig', passado: 'dug', particípio: 'dug' },
    { pt: 'sonhar', presente: 'dream', passado: 'dreamt/dreamed', particípio: 'dreamt/dreamed' },
    { pt: 'proibir', presente: 'forbid', passado: 'forbade', particípio: 'forbidden' },
    { pt: 'perdoar', presente: 'forgive', passado: 'forgave', particípio: 'forgiven' },
    { pt: 'congelar', presente: 'freeze', passado: 'froze', particípio: 'frozen' },
    { pt: 'prender', presente: 'stick', passado: 'stuck', particípio: 'stuck' },
    { pt: 'girar', presente: 'spin', passado: 'spun', particípio: 'spun' },
    { pt: 'jurar (prometer)', presente: 'swear', passado: 'swore', particípio: 'sworn' },
    { pt: 'costurar', presente: 'sew', passado: 'sewed', particípio: 'sewn' },
    { pt: 'cuspir', presente: 'spit', passado: 'spat', particípio: 'spat' },
    { pt: 'saltar', presente: 'leap', passado: 'leapt', particípio: 'leapt' },
    { pt: 'agitar', presente: 'shake', passado: 'shook', particípio: 'shaken' },
    { pt: 'arranhar', presente: 'scratch', passado: 'scratched', particípio: 'scratched' },
    { pt: 'ajoelhar', presente: 'kneel', passado: 'knelt', particípio: 'knelt' },
    { pt: 'saber', presente: 'know', passado: 'knew', particípio: 'known' },
    { pt: 'conduzir', presente: 'lead', passado: 'led', particípio: 'led' },
    { pt: 'pular', presente: 'leap', passado: 'leapt', particípio: 'leapt' },
    { pt: 'acender', presente: 'light', passado: 'lit', particípio: 'lit' },
    { pt: 'montar', presente: 'ride', passado: 'rode', particípio: 'ridden' },
    { pt: 'balançar/sacudir', presente: 'shake', passado: 'shook', particípio: 'shaken' },
    { pt: 'encolher', presente: 'shrink', passado: 'shrank', particípio: 'shrunk' },
    { pt: 'deslizar', presente: 'slide', passado: 'slid', particípio: 'slid' },
    { pt: 'semeiar', presente: 'sow', passado: 'sowed', particípio: 'sown' },
    { pt: 'soletrar', presente: 'spell', passado: 'spelt', particípio: 'spelt' },
    { pt: 'derramar', presente: 'spill', passado: 'spilt', particípio: 'spilt' },
    { pt: 'estragar', presente: 'spoil', passado: 'spoilt', particípio: 'spoilt' },
    { pt: 'picar', presente: 'sting', passado: 'stung', particípio: 'stung' },
    { pt: 'feder', presente: 'stink', passado: 'stank', particípio: 'stunk' },
    { pt: 'bater', presente: 'strike', passado: 'struck', particípio: 'struck' },
    { pt: 'varrer', presente: 'sweep', passado: 'swept', particípio: 'swept' },
    { pt: 'inchar', presente: 'swell', passado: 'swelled', particípio: 'swollen' },
    { pt: 'prosperar', presente: 'thrive', passado: 'throve', particípio: 'thriven' },
    { pt: 'tecer', presente: 'weave', passado: 'wove', particípio: 'woven' },
    { pt: 'enrolar', presente: 'wind', passado: 'wound', particípio: 'wound' },
    { pt: 'retirar', presente: 'withdraw', passado: 'withdrew', particípio: 'withdrawn' }
];

// Lista MESTRA com todos os phrasal verbs
const todosOsPhrasalVerbs: PhrasalVerb[] = [
    { phrasal: 'call off', meaning: 'cancelar' },
    { phrasal: 'get away', meaning: 'escapar' },
    { phrasal: 'find out', meaning: 'descobrir' },
    { phrasal: 'chip in', meaning: 'ajudar' },
    { phrasal: 'give up', meaning: 'desistir' },
    { phrasal: 'calm down', meaning: 'relaxar' },
    { phrasal: 'hang on', meaning: 'esperar' },
    { phrasal: 'go on', meaning: 'continuar' },
    { phrasal: 'close down', meaning: 'interromper' },
    { phrasal: 'hand over', meaning: 'entregar' },
    { phrasal: 'pass away', meaning: 'falecer' },
    { phrasal: 'work out', meaning: 'exercitar-se' },
    { phrasal: 'look for', meaning: 'procurar' },
    { phrasal: 'turn down', meaning: 'rejeitar' },
    { phrasal: 'get over', meaning: 'recuperar' },
    { phrasal: 'set off', meaning: 'iniciar uma jornada' },
    { phrasal: 'get in', meaning: 'chegar (trem, avião)' },
    { phrasal: 'check in', meaning: 'fazer check-in' },
    { phrasal: 'drop off', meaning: 'deixar alguém em um lugar' },
    { phrasal: 'take off', meaning: 'decolar' },
    { phrasal: 'get off', meaning: 'sair (ônibus, trem, avião)' },
    { phrasal: 'speed up', meaning: 'acelerar' },
    { phrasal: 'look around', meaning: 'explorar' },
    { phrasal: 'get on', meaning: 'entrar (ônibus, trem, avião)' },
    { phrasal: 'set out', meaning: 'partir (jornada)' },
    { phrasal: 'see off', meaning: 'despedir-se' },
];

// Lógica para criar os níveis de dificuldade dos verbos
const gerarNiveisDificuldadeVerbos = (): Record<Difficulty, Verb[]> => {
    const verbosUnicosEOrdenados = [...new Map(todosOsVerbos.map(v => [v.pt, v])).values()];
    const total = verbosUnicosEOrdenados.length;
    const tamanhos = {
        facil: Math.floor(total * 0.25),
        medio: Math.floor(total * 0.50),
        dificil: Math.floor(total * 0.75),
        'muito-dificil': total,
    };
    return {
        facil: verbosUnicosEOrdenados.slice(0, tamanhos.facil),
        medio: verbosUnicosEOrdenados.slice(0, tamanhos.medio),
        dificil: verbosUnicosEOrdenados.slice(0, tamanhos.dificil),
        'muito-dificil': verbosUnicosEOrdenados,
    };
};

// Lógica para criar os níveis de dificuldade dos phrasal verbs
const gerarNiveisDificuldadePhrasal = (): Record<Difficulty, PhrasalVerb[]> => {
    const phrasalVerbsOrdenados = [...todosOsPhrasalVerbs]; // Mantém a ordem original
    const total = phrasalVerbsOrdenados.length;
    const tamanhos = {
      facil: Math.floor(total * 0.25),
      medio: Math.floor(total * 0.50),
      dificil: Math.floor(total * 0.75),
      'muito-dificil': total,
    };
    return {
      facil: phrasalVerbsOrdenados.slice(0, tamanhos.facil),
      medio: phrasalVerbsOrdenados.slice(0, tamanhos.medio),
      dificil: phrasalVerbsOrdenados.slice(0, tamanhos.dificil),
      'muito-dificil': phrasalVerbsOrdenados,
    };
};

const verbosPorDificuldade = gerarNiveisDificuldadeVerbos();
const phrasalVerbsPorDificuldade = gerarNiveisDificuldadePhrasal();

// --- COMPONENTES AUXILIARES ---
const Loader = () => (
    <div className="flex justify-center items-center my-2">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
);

// --- COMPONENTES ---
const Header = ({ onBackToHub, showBackButton }: { onBackToHub: () => void; showBackButton: boolean }) => (
    <header className="bg-gray-800 text-white p-4 shadow-md w-full">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">English Trainer</h1>
            {showBackButton && (
                <button
                    onClick={onBackToHub}
                    className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    <span>Voltar ao Hub</span>
                </button>
            )}
        </div>
    </header>
);

const GameHub = ({ onSelectGame }: { onSelectGame: (game: 'verb-setup' | 'phrasal-setup') => void }) => (
    <div className="text-center">
        <h2 className="text-3xl font-semibold mb-8 text-gray-700">Escolha um modo de treino</h2>
        <div className="grid md:grid-cols-2 gap-8">
            <div
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-4 border-transparent hover:border-blue-500"
                onClick={() => onSelectGame('verb-setup')}
            >
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Treinar Verbos Irregulares</h3>
                <p className="text-gray-600">Pratique o presente, passado e particípio dos verbos em inglês.</p>
            </div>
            <div
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-4 border-transparent hover:border-purple-500"
                 onClick={() => onSelectGame('phrasal-setup')}
            >
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Treinar Phrasal Verbs</h3>
                <p className="text-gray-600">Aprenda e memorize os Phrasal Verbs mais comuns.</p>
            </div>
        </div>
    </div>
);

const VerbGameSetup = ({ onStartGame }: { onStartGame: (difficulty: Difficulty) => void }) => (
    <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Jogo de Verbos</h2>
        <p className="text-gray-600 mb-8">Selecione o nível de dificuldade para começar.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <button onClick={() => onStartGame('facil')} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">Fácil</button>
             <button onClick={() => onStartGame('medio')} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">Médio</button>
             <button onClick={() => onStartGame('dificil')} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">Difícil</button>
             <button onClick={() => onStartGame('muito-dificil')} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">Muito Difícil</button>
        </div>
    </div>
);

const PhrasalVerbGameSetup = ({ onStartGame }: { onStartGame: (difficulty: Difficulty) => void }) => (
    <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Jogo de Phrasal Verbs</h2>
        <p className="text-gray-600 mb-8">Selecione o nível de dificuldade para começar.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={() => onStartGame('facil')} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">Fácil</button>
            <button onClick={() => onStartGame('medio')} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">Médio</button>
            <button onClick={() => onStartGame('dificil')} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">Difícil</button>
            <button onClick={() => onStartGame('muito-dificil')} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">Muito Difícil</button>
        </div>
    </div>
);

// Função genérica para chamar a API do Gemini
const callGeminiAPI = async (prompt: string): Promise<string> => {
    const apiKey = ""; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    const systemPrompt = `You are an English teacher. Your goal is to provide a single, simple, and easy-to-understand example sentence for a beginner student. The sentence must use the provided word or phrasal verb. Respond only with the sentence itself, without any introductory text, quotes, or explanations.`;
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
            })
        });

        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        
        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        return text ? text.trim() : "Não foi possível gerar um exemplo.";
    } catch (error) {
        console.error("Gemini API call failed:", error);
        return "Ocorreu um erro ao buscar o exemplo.";
    }
};

const GameCompletion = ({ score, totalQuestions, onRestart, onBackToHub }: { score: number, totalQuestions: number, onRestart: () => void, onBackToHub: () => void }) => (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-green-500 mb-4">Parabéns!</h2>
        <p className="text-gray-700 text-lg mb-6">Você completou o desafio com sucesso.</p>
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <p className="text-xl font-semibold text-gray-800">
                Sua pontuação final foi:
            </p>
            <p className="text-4xl font-bold text-blue-600 mt-2">
                {score} <span className="text-2xl text-gray-500">/ {totalQuestions * 10}</span>
            </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
                onClick={onRestart}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg shadow-md hover:shadow-lg"
            >
                Jogar Novamente
            </button>
            <button
                onClick={onBackToHub}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg shadow-md hover:shadow-lg"
            >
                Voltar ao Hub
            </button>
        </div>
    </div>
);


const VerbGame = ({ verbs, onBackToHub }: { verbs: Verb[], onBackToHub: () => void }) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameComplete, setIsGameComplete] = useState(false);
    
    const allQuestions = useMemo(() => {
        const questions: { verb: Verb; tense: Tense }[] = [];
        verbs.forEach(verb => {
            questions.push({ verb, tense: 'presente' });
            questions.push({ verb, tense: 'passado' });
            questions.push({ verb, tense: 'particípio' });
        });
        return questions.sort(() => Math.random() - 0.5);
    }, [verbs]);

    const [currentQuestion, setCurrentQuestion] = useState(allQuestions[0]);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | ''>('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [geminiExample, setGeminiExample] = useState('');
    const [isLoadingExample, setIsLoadingExample] = useState(false);

    const fetchExample = async (word: string) => {
        setIsLoadingExample(true);
        const example = await callGeminiAPI(`Word: "${word}"`);
        setGeminiExample(example);
        setIsLoadingExample(false);
    };

    const checkAnswer = () => {
        if (!currentQuestion) return;
        setIsSubmitted(true);
        const correctAnswer = currentQuestion.verb[currentQuestion.tense];
        
        if (correctAnswer.split('/').includes(userInput.toLowerCase().trim())) {
            setFeedback('correct');
            setScore(s => s + 10);
            fetchExample(userInput.toLowerCase().trim());
        } else {
            setFeedback('incorrect');
        }
    };

    const handleNext = () => {
        if (questionIndex < allQuestions.length - 1) {
            const nextIndex = questionIndex + 1;
            setQuestionIndex(nextIndex);
            setCurrentQuestion(allQuestions[nextIndex]);
            setUserInput('');
            setFeedback('');
            setIsSubmitted(false);
            setGeminiExample('');
        } else {
            setIsGameComplete(true);
        }
    };

    const restartGame = () => {
        const newShuffled = [...allQuestions].sort(() => Math.random() - 0.5);
        
        setQuestionIndex(0);
        setScore(0);
        setIsGameComplete(false);
        setCurrentQuestion(newShuffled[0]);
        setUserInput('');
        setFeedback('');
        setIsSubmitted(false);
        setGeminiExample('');
    };
    
    if (isGameComplete) {
        return <GameCompletion score={score} totalQuestions={allQuestions.length} onRestart={restartGame} onBackToHub={onBackToHub} />;
    }

    const tenseMap: Record<Tense, string> = { presente: "Presente", passado: "Passado", particípio: "Particípio" };
    const progress = allQuestions.length > 0 ? ((questionIndex + 1) / allQuestions.length) * 100 : 0;

    return (
        <div className="w-full max-w-md mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2 text-gray-600">
                    <span className="font-bold text-lg text-blue-600">Pontos: {score}</span>
                    <span className="text-sm font-medium">{questionIndex + 1} / {allQuestions.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div className="text-center mb-6 min-h-[100px]">
                <p className="text-xl text-gray-700">Qual o <span className="font-bold text-purple-600 capitalize">{tenseMap[currentQuestion.tense]}</span> de</p>
                <h2 className="text-4xl font-bold text-blue-600 capitalize mt-2">{currentQuestion.verb.pt}?</h2>
            </div>
            <div className="space-y-4">
                <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} disabled={isSubmitted} className={`w-full p-3 rounded-lg border-2 transition duration-300 focus:outline-none focus:ring-2 text-center text-lg ${isSubmitted && feedback === 'correct' ? 'border-green-500 bg-green-50 text-green-800 font-bold' : ''} ${isSubmitted && feedback === 'incorrect' ? 'border-red-500 bg-red-50 text-red-800 font-bold' : 'border-gray-300 focus:ring-blue-300'}`} autoComplete="off" onKeyDown={(e) => { if (e.key === 'Enter' && !isSubmitted) checkAnswer() }} />
                {isSubmitted && feedback === 'incorrect' && <p className="text-red-600 mt-1 text-center">Resposta correta: <span className="font-bold">{currentQuestion.verb[currentQuestion.tense]}</span></p>}
            </div>
            {isSubmitted && (
                 <div className="mt-4 p-4 bg-gray-50 rounded-lg min-h-[80px]">
                    <h4 className="font-semibold text-gray-700">Exemplo de uso:</h4>
                    {isLoadingExample && <Loader />}
                    {geminiExample && <p className="text-blue-800 italic mt-1 text-center md:text-left">"{geminiExample}"</p>}
                 </div>
            )}
            <div className="mt-8 text-center">
                {isSubmitted ? ( 
                    <button onClick={handleNext} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg shadow-md hover:shadow-lg group flex items-center justify-center">
                        <span>Próximo</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button> 
                ) : ( 
                    <button onClick={checkAnswer} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg shadow-md hover:shadow-lg">Verificar</button> 
                )}
            </div>
        </div>
    );
};

// Helper function to normalize strings for comparison
const normalizeString = (str: string): string => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[(),.!?-]/g, '') // remove punctuation
        .replace(/\s+/g, ' ')      // normalize whitespace
        .trim();                   // trim again
};

const PhrasalVerbGame = ({ phrasalVerbs, onBackToHub }: { phrasalVerbs: PhrasalVerb[], onBackToHub: () => void }) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameComplete, setIsGameComplete] = useState(false);

    const allQuestions = useMemo(() => {
        const questions: { item: PhrasalVerb; type: 'phrasal' | 'meaning' }[] = [];
        phrasalVerbs.forEach(item => {
            questions.push({ item, type: Math.random() > 0.5 ? 'phrasal' : 'meaning' });
        });
        return questions.sort(() => Math.random() - 0.5);
    }, [phrasalVerbs]);

    const [currentQuestion, setCurrentQuestion] = useState(allQuestions[0]);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | ''>('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [geminiExample, setGeminiExample] = useState('');
    const [isLoadingExample, setIsLoadingExample] = useState(false);

    const fetchExample = async (phrasal: string) => {
        setIsLoadingExample(true);
        const example = await callGeminiAPI(`Phrasal Verb: "${phrasal}"`);
        setGeminiExample(example);
        setIsLoadingExample(false);
    };

    const checkAnswer = () => {
        if (!currentQuestion) return;
        setIsSubmitted(true);
        const correctAnswer = currentQuestion.type === 'phrasal' ? currentQuestion.item.meaning : currentQuestion.item.phrasal;
        
        if (normalizeString(userInput) === normalizeString(correctAnswer)) {
            setFeedback('correct');
            setScore(s => s + 10);
            fetchExample(currentQuestion.item.phrasal);
        } else {
            setFeedback('incorrect');
        }
    };

    const handleNext = () => {
        if (questionIndex < allQuestions.length - 1) {
            const nextIndex = questionIndex + 1;
            setQuestionIndex(nextIndex);
            setCurrentQuestion(allQuestions[nextIndex]);
            setUserInput('');
            setFeedback('');
            setIsSubmitted(false);
            setGeminiExample('');
        } else {
            setIsGameComplete(true);
        }
    };

    const restartGame = () => {
        const newShuffled = [...allQuestions].sort(() => Math.random() - 0.5);
        
        setQuestionIndex(0);
        setScore(0);
        setIsGameComplete(false);
        setCurrentQuestion(newShuffled[0]);
        setUserInput('');
        setFeedback('');
        setIsSubmitted(false);
        setGeminiExample('');
    };

    if (isGameComplete) {
        return <GameCompletion score={score} totalQuestions={allQuestions.length} onRestart={restartGame} onBackToHub={onBackToHub} />;
    }

    if (!currentQuestion) return <Loader />;

    const progress = allQuestions.length > 0 ? ((questionIndex + 1) / allQuestions.length) * 100 : 0;
    const questionText = currentQuestion.type === 'phrasal' ? currentQuestion.item.phrasal : currentQuestion.item.meaning;
    const promptText = currentQuestion.type === 'phrasal' ? 'Qual o significado de' : 'Qual o phrasal verb para';

    return (
        <div className="w-full max-w-md mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2 text-gray-600">
                    <span className="font-bold text-lg text-purple-600">Pontos: {score}</span>
                    <span className="text-sm font-medium">{questionIndex + 1} / {allQuestions.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div className="text-center mb-6 min-h-[100px]">
                <p className="text-xl text-gray-700">{promptText}</p>
                <h2 className="text-4xl font-bold text-purple-600 capitalize mt-2">"{questionText}"?</h2>
            </div>
            <div className="space-y-4">
                <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} disabled={isSubmitted} className={`w-full p-3 rounded-lg border-2 transition duration-300 focus:outline-none focus:ring-2 text-center text-lg ${isSubmitted && feedback === 'correct' ? 'border-green-500 bg-green-50 text-green-800 font-bold' : ''} ${isSubmitted && feedback === 'incorrect' ? 'border-red-500 bg-red-50 text-red-800 font-bold' : 'border-gray-300 focus:ring-purple-300'}`} autoComplete="off" onKeyDown={(e) => { if (e.key === 'Enter' && !isSubmitted) checkAnswer() }} />
                {isSubmitted && feedback === 'incorrect' && <p className="text-red-600 mt-1 text-center">Resposta correta: <span className="font-bold">{currentQuestion.type === 'phrasal' ? currentQuestion.item.meaning : currentQuestion.item.phrasal}</span></p>}
            </div>
            {isSubmitted && (
                 <div className="mt-4 p-4 bg-gray-50 rounded-lg min-h-[80px]">
                    <h4 className="font-semibold text-gray-700">Exemplo de uso:</h4>
                    {isLoadingExample && <Loader />}
                    {geminiExample && <p className="text-purple-800 italic mt-1 text-center md:text-left">"{geminiExample}"</p>}
                 </div>
            )}
            <div className="mt-8 text-center">
                {isSubmitted ? ( 
                    <button onClick={handleNext} className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg shadow-md hover:shadow-lg group flex items-center justify-center">
                        <span>Próximo</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button> 
                ) : ( 
                    <button onClick={checkAnswer} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg shadow-md hover:shadow-lg">Verificar</button> 
                )}
            </div>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL ---
export default function App() {
    const [currentPage, setCurrentPage] = useState<'hub' | 'verb-setup' | 'verbs' | 'phrasal-setup' | 'phrasal-verbs'>('hub');
    const [gameSettings, setGameSettings] = useState<{difficulty: Difficulty}>({difficulty: 'facil'});

    const handleStartVerbGame = (difficulty: Difficulty) => {
        setGameSettings({ difficulty });
        setCurrentPage('verbs');
    }

    const handleStartPhrasalVerbGame = (difficulty: Difficulty) => {
        setGameSettings({ difficulty });
        setCurrentPage('phrasal-verbs');
    }

    const navigateTo = (page: 'hub' | 'verb-setup' | 'phrasal-setup') => {
        setCurrentPage(page);
    };

    const renderPage = () => {
        switch(currentPage) {
            case 'verb-setup':
                return <VerbGameSetup onStartGame={handleStartVerbGame} />;
            case 'verbs':
                return <VerbGame verbs={verbosPorDificuldade[gameSettings.difficulty]} onBackToHub={() => navigateTo('hub')} />;
            case 'phrasal-setup':
                return <PhrasalVerbGameSetup onStartGame={handleStartPhrasalVerbGame} />;
            case 'phrasal-verbs':
                return <PhrasalVerbGame phrasalVerbs={phrasalVerbsPorDificuldade[gameSettings.difficulty]} onBackToHub={() => navigateTo('hub')} />;
            case 'hub':
            default:
                return <GameHub onSelectGame={navigateTo} />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans flex flex-col items-center">
            <Header onBackToHub={() => navigateTo('hub')} showBackButton={currentPage !== 'hub'}/>
            <main className="container mx-auto p-4 md:p-8 flex-grow flex items-center justify-center">
                {renderPage()}
            </main>
        </div>
    );
}

