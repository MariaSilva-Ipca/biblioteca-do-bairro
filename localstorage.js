// Biblioteca do Bairro — localStorage do Zero

// ----- Auxiliares (usados nos exercícios 5 a 11) -----
function ler(chave, omissao) {
  try {
    const texto = localStorage.getItem(chave);
    return texto === null ? omissao : JSON.parse(texto);
  } catch {
    return omissao; // JSON estragado ou armazenamento bloqueado
  }
}

function guardar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch {
    return false; // cheio ou bloqueado: não deixa a página rebentar
  }
}

const $ = (seletor) => document.querySelector(seletor);


// ===== EXERCÍCIO 3: Contador de visitas =====
const contador = $("#contador");
const recomecar = $("#recomecar");

// Number(null) dá 0, por isso a primeira visita conta como 1
const visitas = Number(localStorage.getItem("visitas")) + 1;
localStorage.setItem("visitas", visitas);
contador.textContent = `É a ${visitas}.ª vez que nos visitas`;

recomecar.addEventListener("click", () => {
  localStorage.removeItem("visitas");
  contador.textContent = "Contador reposto.";
});


// ===== EXERCÍCIO 5: A ficha do leitor =====
const saudacao = $("#saudacao");
const listaGeneros = $("#listaGeneros");

if (ler("biblioteca:leitor", null) === null) {
  guardar("biblioteca:leitor", {
    nome: "Ana",
    cartao: "BB-1042",
    generos: ["Romance", "Policial"],
  });
}

const leitor = ler("biblioteca:leitor", null);
saudacao.textContent = `Olá, ${leitor?.nome ?? "visitante"}`;
for (const genero of leitor?.generos ?? []) {
  const li = document.createElement("li");
  li.textContent = genero;
  listaGeneros.append(li);
}


// ===== EXERCÍCIO 7: O tema que se lembra =====
const botaoTema = $("#botaoTema");
const seguirSistema = $("#seguirSistema");

function aplicarTema() {
  const guardado = localStorage.getItem("tema");
  const sistema = matchMedia("(prefers-color-scheme: dark)").matches;
  const escuro = guardado ? guardado === "escuro" : sistema;
  document.body.classList.toggle("escuro", escuro);
  botaoTema.setAttribute("aria-pressed", escuro);
}

botaoTema.addEventListener("click", () => {
  const escuro = !document.body.classList.contains("escuro");
  localStorage.setItem("tema", escuro ? "escuro" : "claro");
  aplicarTema();
});

seguirSistema.addEventListener("click", () => {
  localStorage.removeItem("tema");
  aplicarTema();
});

aplicarTema();


// ===== EXERCÍCIO 8: A lista de leitura que fica =====
const lista = $("#lista");
let leitura = ler("biblioteca:leitura", []);

function mostrar(itens) {
  lista.replaceChildren();
  itens.forEach((item, i) => {
    const li = document.createElement("li");
    li.dataset.indice = i; // liga o li à posição no array
    li.classList.toggle("lido", item.lido);
    const texto = document.createElement("span");
    texto.textContent = item.titulo;
    const remover = document.createElement("button");
    remover.type = "button";
    remover.dataset.acao = "remover";
    remover.textContent = "Remover";
    li.append(texto, remover);
    lista.append(li);
  });
}

function atualizar() {
  guardar("biblioteca:leitura", leitura);
  mostrar(leitura);
}

// Delegação: um só ouvinte na lista
lista.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button");
  const li = evento.target.closest("li");
  if (!li) return;
  const i = Number(li.dataset.indice);
  if (!botao) leitura[i].lido = !leitura[i].lido;
  else if (botao.dataset.acao === "remover") leitura.splice(i, 1);
  atualizar();
});

$("#formLeitura").addEventListener("submit", (evento) => {
  evento.preventDefault();
  const campo = $("#novoTitulo");
  const titulo = campo.value.trim();
  if (!titulo) return;
  leitura.push({ titulo, lido: false });
  campo.value = "";
  atualizar();
});

mostrar(leitura);


// ===== EXERCÍCIO 9: Um aviso por visita =====
const faixa = $("#faixa");
const fecharFaixa = $("#fecharFaixa");
const CHAVE_AVISO = "biblioteca:aviso-fechado";

// sessionStorage: volta num separador novo, mas não ao recarregar neste
if (sessionStorage.getItem(CHAVE_AVISO) !== "sim") {
  faixa.hidden = false;
}

fecharFaixa.addEventListener("click", () => {
  faixa.hidden = true;
  sessionStorage.setItem(CHAVE_AVISO, "sim");
});


// ===== EXERCÍCIO 10: Dois separadores, uma lista =====
// O evento "storage" só chega aos OUTROS separadores
window.addEventListener("storage", (evento) => {
  if (evento.key === "biblioteca:leitura") {
    leitura = JSON.parse(evento.newValue ?? "[]"); // null = chave apagada
    mostrar(leitura);
  }
  if (evento.key === "tema" || evento.key === null) {
    aplicarTema(); // key === null: alguém fez localStorage.clear()
  }
});


// ===== EXERCÍCIO 11: Últimas pesquisas =====
const CHAVE_PESQUISAS = "biblioteca:pesquisas";
const SETE_DIAS = 7 * 24 * 60 * 60 * 1000;

function lerPesquisas() {
  const caixa = ler(CHAVE_PESQUISAS, null);
  if (!caixa || caixa.versao !== 1) return [];              // formato antigo ou inexistente
  if (Date.now() - caixa.guardadoEm > SETE_DIAS) return []; // expirou
  return caixa.dados;
}

function registarPesquisa(termo) {
  const antigas = lerPesquisas().filter((t) => t !== termo); // tira a repetida
  const dados = [termo, ...antigas].slice(0, 5);             // só as 5 últimas
  guardar(CHAVE_PESQUISAS, { versao: 1, guardadoEm: Date.now(), dados });
}

function mostrarPesquisas() {
  const ul = $("#listaPesquisas");
  ul.replaceChildren();
  for (const termo of lerPesquisas()) {
    const li = document.createElement("li");
    li.textContent = termo;
    ul.append(li);
  }
}

$("#formPesquisa").addEventListener("submit", (evento) => {
  evento.preventDefault();
  const termo = $("#termo").value.trim();
  if (!termo) return;
  registarPesquisa(termo);
  mostrarPesquisas();
  $("#termo").value = "";
});

mostrarPesquisas();