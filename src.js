// Biblioteca do Bairro — [escreve aqui o teu nome]

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

for (const l of catalogo) {
console.log(`${l.titulo} — ${l.autor} (${l.ano})`);
}
console.log(catalogo.filter(l => l.disponivel).length);
let antigo = catalogo[0];
for (const l of catalogo) {
if (l.ano < antigo.ano) antigo = l;
}
function emprestar(titulo) {
const livro = catalogo.find(l => l.titulo === titulo);
}
if (!livro) return "Livro não encontrado.";
if (!livro.disponivel) return "Já está emprestado.";
livro.disponivel = false; return "Emprestado!";