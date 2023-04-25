async function recuperarPerguntasPeloTeste() {
    const urlParams = new URLSearchParams(window.location.search);
    const nomeTeste = urlParams.get('teste');

    const res = await fetch(`http://localhost:3000/perguntas/${nomeTeste}`);
    const perguntas = await res.json();
  debugger
    return perguntas;
}

async function criarListaDeTestes() {
    const testes = await recuperarListaTestes();

    const lista = document.createElement('ul');

    testes.map(teste => {
        const link = document.createElement('a');
        link.textContent = teste.teste;
        link.href = `/novasperguntas?teste=${teste.teste}`;
        const item = document.createElement('li');
        item.appendChild(link);
        lista.appendChild(item);
    });
    return lista;
}


// const container = document.querySelector('.lista-de-testes');

recuperarPerguntasPeloTeste()/* .then(lista => container.appendChild(lista)); */