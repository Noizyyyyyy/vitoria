// --- 1. CONFIGURAÇÃO DO CONTADOR DE TEMPO ---
const dataInicio = new Date("2026-02-17T20:21:00");

function atualizarContador() {
    const agora = new Date();
    const diff = agora - dataInicio;

    const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const meses = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const dias = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("anos").innerText = anos;
    document.getElementById("meses").innerText = meses;
    document.getElementById("dias").innerText = dias;
    document.getElementById("horas").innerText = horas;
    document.getElementById("minutos").innerText = minutos;
    document.getElementById("segundos").innerText = segundos;
}
setInterval(atualizarContador, 1000);
atualizarContador();

// --- 2. CONTROLE DO PLAYER DE MÚSICA ---
const musica = document.getElementById('musica-tema');
const btnPlay = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon-path');
const animacaoPlaying = document.getElementById('playing-animation');
const progressBar = document.getElementById('elapsed-bar');
const progressContainer = document.getElementById('progress-bar-container');
const currentTimeTxt = document.getElementById('current-time');
const durationTimeTxt = document.getElementById('duration-time');

function formatarTempo(segundos) {
    if (isNaN(segundos)) return "0:00";
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min}:${seg < 10 ? '0' + seg : seg}`;
}

function atualizarIconePlay(tocando) {
    if (tocando) {
        playIcon.setAttribute('d', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z');
        animacaoPlaying.style.display = 'flex';
    } else {
        playIcon.setAttribute('d', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z');
        animacaoPlaying.style.display = 'none';
    }
}

btnPlay.onclick = () => {
    if (musica.paused) {
        musica.play();
        atualizarIconePlay(true);
    } else {
        musica.pause();
        atualizarIconePlay(false);
    }
};

musica.ontimeupdate = () => {
    if (!isNaN(musica.duration)) {
        const progresso = (musica.currentTime / musica.duration) * 100;
        progressBar.style.width = progresso + "%";
        currentTimeTxt.innerText = formatarTempo(musica.currentTime);
    }
};

musica.onloadedmetadata = () => {
    durationTimeTxt.innerText = formatarTempo(musica.duration);
};

progressContainer.onclick = (e) => {
    const larguraTotal = progressContainer.clientWidth;
    const cliqueX = e.offsetX;
    const novoTempo = (cliqueX / larguraTotal) * musica.duration;
    musica.currentTime = novoTempo;
};

// --- 3. PLAYLIST E TRANSIÇÃO (Caminhos atualizados para src/) ---
const playlist = [
    {
        titulo: "Goo Goo Dolls – Iris",
        artista: "Goo Goo Dolls",
        arquivo: "src/musica1.mp3",
        imagem: "src/casal.png",
        msgPreview: "A meta é te amar, te respeitar, cuidar de você...",
        msgCompleta: [
            "A meta é te amar, te respeitar, cuidar de você e te fazer muito feliz por todos os dias da minha vida.",
            "E não é só um plano, é uma escolha que eu faço, agora e sempre.",
            "Eu quero ser quem te acalma quando as coisas saem do lugar, quem segura sua mão e não solta, mesmo quando ninguém mais entender.",
            "Quero que você sinta, todos os dias, que tem alguém aqui que não mede esforços para ver seu sorriso.",
            "Não é sobre prometer perfeição, é sobre estar junto, construir, aprender, e crescer com você.",
            "É sobre acordar e agradecer por ter você ao meu lado.",
            "E antes de dormir, te lembrar: eu escolho você, mil vezes, em qualquer tempo, em qualquer parte do mundo.",
            "Porque minha meta não muda ela só fica mais forte cada vez que te olho."
        ]
    },
    {
        titulo: "Memória do Prazer",
        artista: "Jorge Vercillo",
        arquivo: "src/musica2.mp3",
        imagem: "src/foto2.png",
        msgPreview: "Eu amo sentir esse anseio para casar logo com você...",
        msgCompleta: [
            "Eu amo sentir esse anseio para casar logo com você. Essa emoção e nervosismo pelo futuro, essa vontade de me tornar alguém bem-sucedido só para crescer ao seu lado.",
            "Eu amo sentir tudo que você me proporciona. Eu amo te sentir, principalmente sentir que vamos ser apenas eu e você para qualquer coisa.",
            "O melhor é que você me faz sentir a vida de perto. Eu te amo, de dedinho!"
        ]
    },
    {
        titulo: "Preciso Dizer Que Te Amo",
        artista: "Cazuza & Bebel Gilberto",
        arquivo: "src/musica3.mp3",
        imagem: "src/foto2.png",
        msgPreview: "Amar você é encontrar abrigo no meio da tempestade...",
        msgCompleta: [
            "Amar você é encontrar abrigo no meio da tempestade. É saber que, mesmo quando tudo desaba lá fora, existe um lugar seguro no teu abraço. Com você, aprendi que o amor não precisa gritar para ser real; ele só precisa ser constante, verdadeiro e presente.",
            "Você chegou devagar, mas ficou fundo, e hoje eu não consigo imaginar meus dias sem sua risada, sem seu toque, sem tua voz me chamando de meu.",
            "Eu te amo porque, com você, sou inteira. Te amo porque você me enxerga até quando eu tento me esconder. Eu te amo porque, no fim das contas, é no teu olhar que eu encontro paz.",
            "E, se for para viver tudo isso, que seja com você: sem medo, sem pressa e sem fim. Por fim, mas não menos importante, eu quero que você saiba que você nunca estará só. Mesmo quando tudo parecer difícil, eu estou aqui."
        ]
    },
    {
        titulo: "Levo Comigo",
        artista: "RESTART",
        arquivo: "src/musica4.mp3",
        imagem: "src/foto2.png",
        msgPreview: "Amo você por tantos motivos que às vezes nem sei...",
        msgCompleta: [
            "Amo você por tantos motivos que às vezes nem sei por onde começar. Amo o jeito como seu sorriso ilumina qualquer dia nublado.",
            "Amo a forma como você cuida de mim, com uma delicadeza que só você tem. Admiro a sua força, sua bondade e a forma como enxerga a vida.",
            "Você me inspira a ser melhor, me dá coragem para enfrentar o que vier. O seu abraço é meu refúgio.",
            "Amo cada detalhe seu, desde os seus traços encantadores até às peculiaridades que fazem de você uma pessoa única. Amo a nossa cumplicidade."
        ]
    },
    {
        titulo: "Vagalumes",
        artista: "Pollo",
        arquivo: "src/musica5.mp3",
        imagem: "src/foto2.png",
        msgPreview: "Eii Princesa, sem pressa tá?",
        msgCompleta: [
            "Eii Princesa, sem pressa tá? Eu ainda vou te dar um buquê de flores, mas...",
            " . ", " . ", " . ", " . ", " . ", "Olha para trás."
        ]
    }
];

let indexAtual = 0;

function carregarConteudo(index) {
    const item = playlist[index];

    document.getElementById('music-title').innerText = item.titulo;
    document.getElementById('music-artist').innerText = item.artista;
    document.getElementById('main-img').src = item.imagem;
    
    musica.src = item.arquivo;
    musica.load();

    document.getElementById('msg-preview').innerText = item.msgPreview;

    const containerLyrics = document.getElementById('lyrics-body');
    if (containerLyrics) {
        containerLyrics.innerHTML = ""; 
        item.msgCompleta.forEach(linha => {
            const p = document.createElement('p');
            p.className = "lyric-line active";
            p.innerText = linha;
            containerLyrics.appendChild(p);
        });
    }

    musica.play().then(() => {
        atualizarIconePlay(true);
    }).catch(e => console.log("Play bloqueado pelo navegador até interação do usuário."));
}

document.getElementById('next-btn').onclick = () => {
    indexAtual++;
    if (indexAtual >= playlist.length) indexAtual = 0;
    carregarConteudo(indexAtual);
};

document.getElementById('prev-btn').onclick = () => {
    indexAtual--;
    if (indexAtual < 0) indexAtual = playlist.length - 1;
    carregarConteudo(indexAtual);
};

musica.onended = () => {
    indexAtual++;
    if (indexAtual >= playlist.length) indexAtual = 0;
    carregarConteudo(indexAtual);
};

// --- 4. MODAIS ---
const modalMensagem = document.getElementById('modal-mensagem');
const btnAbrirMensagem = document.getElementById('btn-abrir-mensagem');
const btnFecharMensagem = document.getElementById('btn-fechar-mensagem');

btnAbrirMensagem.onclick = () => modalMensagem.style.display = 'flex';
btnFecharMensagem.onclick = () => modalMensagem.style.display = 'none';

const modalVersiculo = document.getElementById("modal-versiculo");
const btnVersiculo = document.getElementById("btn-versiculo");
const closeVersiculo = document.querySelector(".close-btn");

btnVersiculo.onclick = () => modalVersiculo.style.display = "flex";
closeVersiculo.onclick = () => modalVersiculo.style.display = "none";

window.onclick = (event) => {
    if (event.target == modalVersiculo) modalVersiculo.style.display = "none";
};