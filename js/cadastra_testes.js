async function recuperarListaTestes() {
    const res = await fetch('http://localhost:3000/testes');
    return await res.json();
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

async function onClickAdicionarTeste() {
    const valueInput = document.getElementById('input-cadastro-teste').value;

    if (!valueInput) return alert('O campo descrição é obrigatório');

    const testes = await recuperarListaTestes();

    testes.push({
        teste: valueInput,
        perguntas: []
    });

    try {
        const request = fetch('http://localhost:3000/teste', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json, text/plain, */*'
            },
            body: JSON.stringify(testes),
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

const container = document.querySelector('.lista-de-testes');

criarListaDeTestes().then(lista => container.appendChild(lista));