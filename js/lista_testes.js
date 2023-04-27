async function criarListaDeTestes() {
  const res = await fetch('http://localhost:3000/testes');
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

const container = document.querySelector('.lista-de-testes');
criarListaDeTestes().then(lista => container.appendChild(lista));