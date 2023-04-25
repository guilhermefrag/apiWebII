async function createListaDeTestes() {
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
  
    const selectedTest = testes.find(teste => teste.teste === filter_teste);
  
    const perguntas = selectedTest.perguntas;
    perguntas.forEach(pergunta => {
      const li = document.createElement('li');
      const ul = document.createElement('ul');
      li.appendChild(ul);
      for (let i = 'A'.charCodeAt(); i <= 'E'.charCodeAt(); i++) {
        const opcao = `opcao${String.fromCharCode(i)}`;
        const opcaoValue = pergunta[opcao];
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = pergunta.pergunta;
        input.value = opcao;
        const label = document.createElement('label');
        label.textContent = `${String.fromCharCode(i)}: ${opcaoValue}`;
        label.insertBefore(input, label.firstChild);
        const liOpcao = document.createElement('li');
        liOpcao.appendChild(label);
        ul.appendChild(liOpcao);
      }
      const span = document.createElement('span');
      span.textContent = pergunta.pergunta;
      li.insertBefore(span, ul);
      perguntasList.appendChild(li);
    });
  }
}

createListaDeTestes();
