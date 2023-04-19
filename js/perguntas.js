async function criarListaDeTestes() {
  const res = await fetch('http://localhost:3000/testes');
  const testes = await res.json();
  const urlParams = new URLSearchParams(window.location.search);
  const filter_teste = urlParams.get('teste');
  const select = document.querySelector('#testes-select');

  testes.map(teste => {
    const option = document.createElement('option');
    option.value = teste.teste;
    option.textContent = teste.teste;
    option.defaultSelected = teste.teste === filter_teste;
    select.appendChild(option);
  });

  select.addEventListener('change', changeTeste);  
  await createListaDePerguntas();
  
  function changeTeste(){
    const teste = select.value;
    if (filter_teste !== teste) {
      window.location.href = `/perguntas?teste=${teste}`;
    }
  }

  async function createListaDePerguntas() {
    
  }

}



criarListaDeTestes();