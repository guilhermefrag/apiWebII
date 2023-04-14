async function criarListaDeTestes() {
  const res = await fetch('http://localhost:3000/testes');
  const testes = await res.json();
  const urlParams = new URLSearchParams(window.location.search);
  const filter_teste = urlParams.get('teste');
  const teste = testes.filter((t) => t.teste === filter_teste);
  const select = document.querySelector('#testes-select');

  teste.map(teste => {
    const option = document.createElement('option');
    option.value = teste.teste;
    option.textContent = teste.teste;
    select.appendChild(option);
  });
}


criarListaDeTestes();