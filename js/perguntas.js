async function recuperarPerguntasDoTeste() {
  const res = await fetch('http://localhost:3000/testes');
  const testes = await res.json();
  const urlParams = new URLSearchParams(window.location.search);
  const filter_teste = urlParams.get('teste');
  const selectedTest = testes.find(teste => teste.teste === filter_teste);
  const perguntas = selectedTest.perguntas;

  return perguntas;
}

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

  function changeTeste() {
    const teste = select.value;
    if (filter_teste !== teste) {
      window.location.href = `/perguntas?teste=${teste}`;
    }
  }

  async function createListaDePerguntas() {
    const perguntasList = document.querySelector('.perguntas');
    const perguntas = await recuperarPerguntasDoTeste();

    perguntas.forEach((pergunta, index) => {
      const li = document.createElement('li');
      const ul = document.createElement('ul');
      ul.id = `pergunta-${index}`
      li.appendChild(ul);
      for (let i = 'A'.charCodeAt(); i <= 'E'.charCodeAt(); i++) {
        const opcao = `opcao${String.fromCharCode(i)}`;
        const opcaoValue = pergunta[opcao];
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = pergunta.pergunta;
        input.value = opcao;
        input.id = `pergunta${index}-opcao-${opcao}`
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

async function onClickRealizarTeste() {
  const perguntas = await recuperarPerguntasDoTeste();
  let corretas = 0;

  perguntas.forEach((pergunta, index) => {
    const ul = document.getElementById(`pergunta-${index}`);
    const list = ul.querySelectorAll('li');

    list.forEach(li => {
      const input = li.querySelector('input');

      if (input.checked && input.value === pergunta.resposta) {
        corretas++;
      }
    })
  });

  const urlParams = new URLSearchParams(window.location.search);
  const nomeTeste = urlParams.get('teste');

  try {
    const res = await fetch('http://localhost:3000/resultados');

    const resultados = await res.json() ?? [];
    resultados.push({
      teste: nomeTeste,
      qtd_perguntas: perguntas.length.toString(),
      qtd_acertos: corretas.toString()
    });

    const request = fetch('http://localhost:3000/resultado', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json, text/plain, */*'
      },
      body: JSON.stringify(resultados),
    });

    request.then(res => {
      if (res.status === 200) {
        setTimeout(() => {
          window.location.href = 'lista-resultados';
        }, 200);
      };
    })
  } catch (error) {
    alert(error)
  }
}

createListaDeTestes();
