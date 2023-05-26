const botao = document.getElementById("botao");
const divEnd = document.getElementById("divEnd");

let itens = [];
getLocalStorage();

function criarObjeto() {
  const inputCidade = document.getElementById("cidade");
  const inputRua = document.getElementById("rua");
  const inputNumero = document.getElementById("numero");
  const inputBairro = document.getElementById("bairro");
  const inputCep = document.getElementById("cep");

  if (inputCidade && inputRua && inputNumero && inputBairro && inputCep) {
    const objeto = {
      cidade: inputCidade.value,
      rua: inputRua.value,
      numero: inputNumero.value,
      bairro: inputBairro.value,
      cep: inputCep.value,
    };
    return objeto;
  }
  return null;
}

botao.addEventListener("click", (_) => {
  const objeto = criarObjeto();
  if (objeto) {
    itens.push(objeto);
  }
  adicionarItens();
  addLocalStorage();
});

function adicionarItens() {
  divEnd.innerHTML = "";
  itens.forEach((item, i) => {
    let row = document.createElement("div");
    row.className = "row mt-3";
    row.innerHTML = `
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4>${i}</h4>
            <p>Cidade: ${JSON.stringify(item["cidade"])}</p>
            <p>Rua: ${JSON.stringify(item["rua"])}</p>
            <p>Número: ${JSON.stringify(item["numero"])}</p>
            <p>Bairro: ${JSON.stringify(item["bairro"])}</p>
            <p>CEP: ${JSON.stringify(item["cep"])}</p>
          </div>
        </div>
        <div>
          <button class="btn btn-success" id="editar" onclick="editar(${i})">
          Editar
          </button>
        </div>
      </div>
      </div>
    `;
    divEnd.appendChild(row);
  });
}

function excluir(_) {
  const idExclusao = prompt("Informe o Id:");
  itens.splice(idExclusao, 1);
  adicionarItens();
  addLocalStorage();
}

function editar(item) {
  let editCidade = prompt("Digite o nome da cidade:");
  let editRua = prompt("Digite o nome da rua:");
  let editNumero = prompt("Digite o número:");
  let editBairro = prompt("Digite o nome do bairro:");
  let editCep = prompt("Digite o CEP da localização:");

  itens[item].cidade = upper(editCidade);
  itens[item].rua = upper(editRua);
  itens[item].numero = editNumero;
  itens[item].bairro = upper(editBairro);
  itens[item].cep = editCep;

  adicionarItens();
  addLocalStorage();
}

function addLocalStorage() {
  localStorage.setItem("itens", JSON.stringify(itens));
}

function getLocalStorage() {
  try {
    itens = JSON.parse(localStorage.getItem("itens"));
    adicionarItens();
  } catch (error) {
    localStorage.setItem("itens", "[]");
  }
}

function upper(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
