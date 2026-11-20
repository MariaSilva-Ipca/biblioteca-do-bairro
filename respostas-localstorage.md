# localStorage do Zero · Respostas (exercícios sem página)

Os exercícios com código (3, 5, 7, 8, 9, 10 e 11) estão em `localstorage.html` + `localstorage.js`.
Aqui ficam os que são de resposta escrita ou de consola.

## Ex. 1 · Espreitar o armazenamento
F12 › Aplicação (Application) › Armazenamento local. Cada origem só vê o que é seu.
Na consola:

```js
localStorage.length            // quantas chaves existem (ex.: 12)
localStorage.key(0)            // nome da primeira chave (ex.: "theme")
localStorage.getItem("theme")  // o valor (ex.: "dark")
localStorage.removeItem("theme") // apaga; devolve undefined
```
Os cookies vêm no mesmo separador, em Cookies.

## Ex. 2 · Onde guardavas?
| Caso | Onde | Porquê |
|---|---|---|
| Tema escuro | localStorage | Preferência pequena, para sempre |
| Sessão de login | Cookie HttpOnly | O servidor precisa; o JS não deve ler |
| Passo do formulário | sessionStorage | Só neste separador, nesta visita |
| Mil capas offline | IndexedDB | Ficheiros e muito espaço |
| Reservas | Servidor | Partilhadas entre pessoas |

## Ex. 4 · Prevê o resultado
```js
localStorage.setItem("n", 10);
localStorage.setItem("n", 20);       // mesma chave: o valor é substituído
localStorage.setItem("ativo", false);

localStorage.getItem("n")                 // "20"
localStorage.getItem("n") + 5             // "205"  (tudo volta como texto)
Boolean(localStorage.getItem("ativo"))    // true   ("false" é texto não vazio)
localStorage.getItem("Ativo")             // null   (maiúsculas contam)
localStorage.length                       // 2
```

## Ex. 6 · Corrige o código
1. `getItem` devolve texto, por isso usa `JSON.parse` (a função `ler` já faz isso).
2. `setItem` só aceita texto, por isso `JSON.stringify` (a função `guardar` já faz isso).
3. Compara com `"escuro"`, que é o valor realmente guardado.
4. O leitor pode não existir, por isso `dados?.nome ?? "visitante"`.

```js
const lista = ler("leitura", []);                          // 1
lista.push("Os Lusíadas");
guardar("leitura", lista);                                 // 2

const tema = localStorage.getItem("tema");
if (tema === "escuro") document.body.classList.add("escuro"); // 3

const dados = ler("leitor", null);                         // 4
saudacao.textContent = `Olá, ${dados?.nome ?? "visitante"}`;
```

## Ex. 12 · Auditoria de privacidade
Duas perguntas para cada linha: *e se outra pessoa lesse isto?* e *e se o utilizador mudasse isto?*
Guardar o mínimo necessário.

| Linha | Avaliação | Porquê / alternativa |
|---|---|---|
| `tema` | Aceitável | Preferência inofensiva |
| `token` | A evitar | Pode ser lido por XSS: usar cookie HttpOnly |
| `leitor` com NIF | Arriscado | Guardar só o nome; o resto no servidor |
| `desconto` | A evitar | O utilizador pode mudá-lo; o servidor é que decide |
| `passo` (session) | Aceitável | Temporário e inofensivo |
| `palavraPasse` | A evitar | Nunca guardar palavras-passe |
