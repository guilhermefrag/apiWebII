async function recuperarListaResultados() {
    const res = await fetch('http://localhost:3000/resultados');
    return await res.json();
}

async function criarListaDeResultados() {
    const resultados = await recuperarListaResultados(),
        resultadosAux = [];

    resultados
        .sort(function (a, b) {
            return parseFloat(a.qtd_perguntas) < parseFloat(b.qtd_perguntas) ? -1 : parseFloat(a.qtd_perguntas) > parseFloat(b.qtd_perguntas) ? 1 : 0;
        })
        .reverse();

    resultados.forEach(resultado => {
        const resultadosMesmaQtd = resultados.filter(r => resultado.qtd_perguntas === r.qtd_perguntas);

        const resultadosMesmaQtdOrdenado = resultadosMesmaQtd
            .sort(function (a, b) {
                return parseFloat(a.qtd_acertos) < parseFloat(b.qtd_acertos) ? -1 : parseFloat(a.qtd_acertos) > parseFloat(b.qtd_acertos) ? 1 : 0;
            })
            .reverse();

        if (resultadosAux.some(r => r.teste === resultado.teste)) return;

        resultadosAux.push(...resultadosMesmaQtdOrdenado);
    });

    const lista = document.createElement('ul');

    resultadosAux.map(teste => {
        const nomeTeste = document.createElement('p');
        const qtdAcertos = document.createElement('p');
        const qtdPergnutas = document.createElement('p');
        const media = document.createElement('p');
        const div = document.createElement('div');
        var calculo;
        nomeTeste.textContent = teste.teste;
        nomeTeste.classList.add('pergunta');
        qtdAcertos.textContent = 'Nº Acertos: ' + teste.qtd_acertos;
        qtdPergnutas.textContent = 'Nº Perguntas: ' + teste.qtd_perguntas;
        calculo = (teste.qtd_acertos * 100) / teste.qtd_perguntas;
        media.textContent = 'Media: ' + parseFloat(calculo.toFixed(2)) + '% de acertos';
        media.classList.add('media');
        div.appendChild(nomeTeste);
        div.appendChild(qtdPergnutas);
        div.appendChild(qtdAcertos);
        div.appendChild(media);
        const item = document.createElement('li');
        item.appendChild(div);
        lista.appendChild(item);
    });
    return lista;
}

const container = document.querySelector('.lista-de-resultados');

criarListaDeResultados().then(lista => container.appendChild(lista));