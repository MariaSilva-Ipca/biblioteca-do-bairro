// Biblioteca do Bairro — Aula 1 · JavaScript do Zero

// ===== EXERCÍCIO 1: Olá, consola =====
console.log("Bem-vindos à Biblioteca do Bairro!");

// Erro de propósito (descomenta para veres o erro na consola):
// console.lg("teste"); // TypeError: console.lg is not a function


// ===== EXERCÍCIO 2: Os dados da biblioteca =====
const nome = "Biblioteca do Bairro";
const morada = "Rua das Flores, 12";
let livros = 1250;

livros = livros - 3; // três empréstimos
console.log(livros); // 1247

console.log(`A ${nome} tem ${livros} livros disponíveis.`);
console.log(typeof nome, typeof morada, typeof livros);
console.log(nome.toUpperCase());


// ===== EXERCÍCIO 3: Aberta ou fechada? =====
const dia = "sábado";
const hora = 11;
let aberta;

if (dia === "domingo") {
  aberta = false;
} else if (dia === "sábado") {
  aberta = hora >= 10 && hora < 13;
} else {
  aberta = hora >= 9 && hora < 19;
}

console.log(aberta ? "Aberta" : "Fechada");


// ===== EXERCÍCIO 4: Funções da biblioteca =====
function calcularMulta(dias) {
  return dias > 15 ? (dias - 15) * 0.5 : 0;
}

function formatarEuros(valor) {
  return valor.toFixed(2).replace(".", ",") + " €";
}

function mensagemMulta(dias) {
  const multa = calcularMulta(dias);
  if (multa === 0) return "Sem multa";
  return `Multa a pagar: ${formatarEuros(multa)}`;
}

console.log(mensagemMulta(10)); // Sem multa
console.log(mensagemMulta(22)); // Multa a pagar: 3,50 €


// ===== EXERCÍCIO 5: Lista de leituras =====
const leituras = ["Os Maias", "Mensagem", "A Sibila", "Os Lusíadas", "Aparição"];

leituras.push("Memorial do Convento", "Ensaio sobre a Cegueira");
console.log(leituras.length); // 7

leituras.forEach((titulo, i) => {
  console.log(`${i + 1}. ${titulo}`);
});

const longos = leituras.filter(t => t.length > 10);
const maiusculas = leituras.map(t => t.toUpperCase());
console.log(longos, maiusculas);


// ===== EXERCÍCIO 6: O catálogo em objetos =====
// Começa com seis livros escritos aqui; no exercício 9 passa a vir do livros.json
let catalogo = [
  { titulo: "Os Maias", autor: "Eça de Queirós", ano: 1888, disponivel: true },
  { titulo: "Mensagem", autor: "Fernando Pessoa", ano: 1934, disponivel: false },
  { titulo: "A Sibila", autor: "Agustina Bessa-Luís", ano: 1954, disponivel: true },
  { titulo: "Os Lusíadas", autor: "Luís de Camões", ano: 1572, disponivel: true },
  { titulo: "Aparição", autor: "Vergílio Ferreira", ano: 1959, disponivel: false },
  { titulo: "Ensaio sobre a Cegueira", autor: "José Saramago", ano: 1995, disponivel: true },
];

for (const l of catalogo) {
  console.log(`${l.titulo} — ${l.autor} (${l.ano})`);
}

console.log(catalogo.filter(l => l.disponivel).length); // quantos disponíveis

let antigo = catalogo[0];
for (const l of catalogo) {
  if (l.ano < antigo.ano) antigo = l;
}
console.log("Mais antigo:", antigo.titulo);

function emprestar(titulo) {
  const livro = catalogo.find(l => l.titulo === titulo);
  if (!livro) return "Livro não encontrado.";
  if (!livro.disponivel) return "Já está emprestado.";
  livro.disponivel = false;
  return "Emprestado!";
}

console.log(emprestar("Os Maias"));   // Emprestado!
console.log(emprestar("Os Maias"));   // Já está emprestado.
console.log(emprestar("Inventado"));  // Livro não encontrado.
catalogo.find(l => l.titulo === "Os Maias").disponivel = true; // repõe para os exercícios seguintes


// ===== EXERCÍCIO 7: O catálogo na página =====
const lista = document.querySelector("#lista");
const resumo = document.querySelector("#resumo");

function mostrarLivros(livros) {
  lista.replaceChildren();
  for (const l of livros) {
    const item = document.createElement("li");
    item.dataset.titulo = l.titulo;
    item.textContent = `${l.titulo} — ${l.autor} (${l.ano})`;
    if (!l.disponivel) {
      item.classList.add("indisponivel");
      item.append(" · emprestado");
    }
    // botão de favorito (exercício 9)
    const fav = document.createElement("button");
    fav.type = "button";
    fav.dataset.acao = "favorito";
    fav.textContent = favoritos.includes(l.titulo) ? "★" : "☆";
    fav.setAttribute("aria-label", `Favorito: ${l.titulo}`);
    item.append(fav);
    lista.append(item);
  }
  const n = livros.filter(l => l.disponivel).length;
  resumo.textContent = `${livros.length} livros, ${n} disponíveis`;
}


// ===== EXERCÍCIO 8: Pesquisar e inscrever =====
const pesquisa = document.querySelector("#pesquisa");
const botao = document.querySelector("#botao");
let soDisponiveis = false;

function atualizar() {
  const texto = pesquisa.value.trim().toLowerCase();
  let res = catalogo.filter(l => l.titulo.toLowerCase().includes(texto));
  if (soDisponiveis) res = res.filter(l => l.disponivel);
  mostrarLivros(res);
  if (!res.length) lista.textContent = "Nenhum livro encontrado.";
}

pesquisa.addEventListener("input", atualizar);
botao.addEventListener("click", () => {
  soDisponiveis = !soDisponiveis;
  botao.setAttribute("aria-pressed", soDisponiveis);
  atualizar();
});

const formulario = document.querySelector("#formulario");
const mensagem = document.querySelector("#mensagem");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // não deixa a página recarregar
  const nomeInsc = formulario.elements.nome.value.trim();
  const email = formulario.elements.email.value.trim();
  if (nomeInsc.length < 2) {
    mensagem.textContent = "Escreve o teu nome.";
    return;
  }
  if (!email.includes("@") || !email.includes(".")) {
    mensagem.textContent = "O email não parece válido.";
    return;
  }
  mensagem.textContent = `Obrigado, ${nomeInsc}! Inscrição registada.`;
  formulario.reset();
});


// ===== EXERCÍCIO 9: Lembrar e carregar =====
// Favoritos: array de títulos guardado como texto JSON
let favoritos = [];
try {
  favoritos = JSON.parse(localStorage.getItem("favoritos") ?? "[]");
} catch {
  favoritos = [];
}

lista.addEventListener("click", (evento) => {
  const b = evento.target.closest("button[data-acao='favorito']");
  if (!b) return;
  const titulo = b.closest("li").dataset.titulo;
  favoritos = favoritos.includes(titulo)
    ? favoritos.filter(t => t !== titulo)
    : [...favoritos, titulo];
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  atualizar();
});

async function carregarLivros() {
  try {
    const resposta = await fetch("livros.json");
    catalogo = await resposta.json();
    atualizar();
  } catch {
    lista.textContent = "Erro ao carregar o catálogo.";
  }
}
carregarLivros();

// Tema escuro lembrado
const botaoTema = document.querySelector("#botaoTema");
const tema = localStorage.getItem("tema");
document.body.classList.toggle("escuro", tema === "escuro");
botaoTema.setAttribute("aria-pressed", tema === "escuro");

botaoTema.addEventListener("click", () => {
  const escuro = document.body.classList.toggle("escuro");
  localStorage.setItem("tema", escuro ? "escuro" : "claro");
  botaoTema.setAttribute("aria-pressed", escuro);
});

// primeira pintura (antes do fetch terminar, com os livros iniciais)
atualizar();