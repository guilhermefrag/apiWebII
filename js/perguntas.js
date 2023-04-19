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
    const res = await fetch('http://localhost:3000/testes');
    const testes = await res.json();
    const urlParams = new URLSearchParams(window.location.search);
    const filter_teste = urlParams.get('teste');
    const perguntasList = document.querySelector('.perguntas');
  
    // Find the selected test
    const selectedTest = testes.find(teste => teste.teste === filter_teste);
  
    // Generate a list of questions for the selected test
    const perguntas = selectedTest.perguntas;
    perguntas.forEach(pergunta => {
      const li = document.createElement('li');
      li.textContent = pergunta.pergunta;
      const ul = document.createElement('ul');
      for (let i = 'A'.charCodeAt(); i <= 'E'.charCodeAt(); i++) {
        const opcao = `opcao${String.fromCharCode(i)}`;
        const opcaoValue = pergunta[opcao];
        const resposta = pergunta.resposta === opcao ? ' (Resposta)' : '';
        const liOpcao = document.createElement('li');
        liOpcao.textContent = `${String.fromCharCode(i)}: ${opcaoValue}${resposta}`;
        ul.appendChild(liOpcao);
      }
      li.appendChild(ul);
      perguntasList.appendChild(li);
    });
  }

}



criarListaDeTestes();