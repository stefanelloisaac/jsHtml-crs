const botao = document.getElementById("botao");
const input = document.getElementById("todos");
const divItens = document.getElementById("divItens");

let itens = [];
getLocalStorage();

botao.addEventListener("click", (_) => {
  if (input.value) {
    itens.push(input.value);
  }
  adicionarItens();
  addLocalStorage();
});

function adicionarItens() {
  divItens.innerHTML = "";
  itens.forEach((item, i) => {
    let row = document.createElement("div");
    row.className = "row mt-3";
    row.innerHTML = `
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            ${i} - ${item}
          </div>
        </div>
        <div>
          <button class="btn btn-danger" id="status" onclick="atualizarStatus(this)">
          Pendente
          </button>
        </div>
      </div>
    `;
    divItens.appendChild(row);
  });
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

function excluir(_) {
  const idExclusao = prompt("Informe o Id:");
  itens.splice(idExclusao, 1);
  adicionarItens();
  addLocalStorage();
}

function editar(_) {
  const idEdicao = Number(prompt("Qual item você quer editar?"));
  const valueEdicao = prompt("Digite o novo texto:");
  itens[idEdicao] = valueEdicao;
  adicionarItens();
  addLocalStorage();
}

function atualizarStatus(status) {
  if (status.innerHTML === "Pendente") {
    status.innerHTML = "Em andamento";
    status.className = "btn btn-warning";
  } else if (status.innerHTML === "Em andamento") {
    status.innerHTML = "Concluído";
    status.className = "btn btn-success";
  } else {
    status.innerHTML = "Pendente";
    status.className = "btn btn-danger";
  }
}
