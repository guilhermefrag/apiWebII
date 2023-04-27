async function recuperarListaTestes() {
    const res = await fetch('http://localhost:3000/testes');
    return await res.json();
}
async function recuperarPerguntasPeloTeste() {
    const urlParams = new URLSearchParams(window.location.search);
    const nomeTeste = urlParams.get('teste');
    const res = await fetch(`http://localhost:3000/perguntas/${nomeTeste}`);
    const perguntas = await res.json();

    return perguntas;
}

async function criarListaDePerguntas() {
    const perguntas = await recuperarPerguntasPeloTeste();
    const lista = document.createElement('ul');

    perguntas.map(pergunta => {
        const tituloPergunta = pergunta.pergunta;
        const opcoes = Object.keys(pergunta).filter(p => p.includes('opcao')).map(p => pergunta[p]);
        const resposta = pergunta[Object.keys(pergunta).find(p => p === 'resposta')];
        const item = document.createElement('li');
        item.textContent = tituloPergunta;
        item.classList.add('pergunta')
        lista.appendChild(item);

        opcoes.map(opcao => {
            const respostas = document.createElement('li');

            if (pergunta[resposta] === opcao) respostas.classList.add('opcao-correta')

            respostas.textContent = opcao
            respostas.classList.add('respostas');
            item.appendChild(respostas);
        })
    });

    return lista;
}

async function onClickAdicionarPergunta() {
    const pergunta = document.getElementById('input-cadastro-pergunta').value;
    const urlParams = new URLSearchParams(window.location.search);

    if (!pergunta) return alert('O campo descrição é obrigatório');

    const nomeTeste = urlParams.get('teste');
    const opcaoA = document.getElementById('input-opcao-a').value;
    const opcaoB = document.getElementById('input-opcao-b').value;
    const opcaoC = document.getElementById('input-opcao-c').value;
    const opcaoD = document.getElementById('input-opcao-d').value;
    const opcaoE = document.getElementById('input-opcao-e').value;
    const resposta = document.getElementById('input-resposta-correta').value;

    if (!opcaoA || !opcaoB || !opcaoC || !opcaoD || !opcaoE) return alert('Preencha todas as opções!')


    const testes = await recuperarListaTestes();

    testes.forEach(item => {
        if (item.teste === nomeTeste) {
            item.perguntas.push({
                pergunta: pergunta,
                opcaoA: opcaoA,
                opcaoB: opcaoB,
                opcaoC: opcaoC,
                opcaoD: opcaoD,
                opcaoE: opcaoE,
                resposta: resposta
            })
        }
    });

    try {
        const request = fetch('http://localhost:3000/pergunta/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json, text/plain, */*'
            },
            body: JSON.stringify(testes)
        });

        request.then(res => {
            if (res.status === 200) {
                setTimeout(() => {
                    location.reload()
                }, 200);
            };
        })
    } catch (error) {
        alert(error)
    }
}

const container = document.querySelector('.lista-de-perguntas');

criarListaDePerguntas().then(lista => container.appendChild(lista));