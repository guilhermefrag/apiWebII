async function criarListaDeTestes() {
    const res = await fetch('http://localhost:3000/testes', { cache: 'no-cache' });
    const testes = await res.json();

    const lista = document.createElement('ul');
    testes.map(teste => {
        const link = document.createElement('a');
        link.textContent = teste.teste;
        link.href = `/perguntas?teste=${teste.teste}`;
        const item = document.createElement('li');
        item.appendChild(link);
        lista.appendChild(item);
    });
    return lista;
}


async function onClickAdicionarTeste() {
    const valueInput = document.getElementById('input-cadastro-teste').value;
    const res = await fetch('http://localhost:3000/testes');
    const testes = await res.json();

    testes.push({
        teste: valueInput,
        perguntas: []
    });

    try {
        await fetch('http://localhost:3000/teste', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(testes),
        });

        location.reload();
    } catch (error) {
        console.log(error)
    }
}

const container = document.querySelector('.lista-de-testes');
criarListaDeTestes().then(lista => container.appendChild(lista));