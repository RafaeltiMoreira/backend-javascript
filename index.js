const express = require("express");
const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/oi", function (req, res) {
  res.send("Olá, mundo!");
});

//CRUD de lista DevMon

const items = ["Java", "Android", "Kotlin", "Express", "NestJS"]

// READ ALL - [GET] /items

app.get("/items", function (req, res) {
  res.send(items.filter(Boolean))
})

// READ BY ID - [GET] /items/:id
app.get("/items/:id", function (req, res) {
  // Acessar o parâmetro de rota ID
  // Subtrair 1 (um) para corrigir o índice (array) da lista que começa em 0 (zero)
  const id = req.params.id - 1;

  // Acesso ao item na lista a partir do index
  const item = items[id]

  // Exibe o item obtido
  res.send(item)
})

// CREATE - [POST] /items
/*app.post("/items", function (req, res) {
  res.send("Create item")
})*/

app.post("/items", function (req, res) {
  // Extrair informação do corpo da requisição
  const item = req.body.name

  // Inserir info na lista
  items.push(item)

  // Envio msg de sucesso!
  res.send("Item created successfully")
})

// UPDATE - [PUT] /items/:id
app.put("/items/:id", function (req, res) {
  // Acesso ao parâmetro de rota e corrigido o índice
  const id = req.params.id - 1;

  // Obtemos o novo item a partir do corpo da requisição
  const newItem = req.body.name

  // Colocando o novo item na mesma posição do item anterior
  items[id] = newItem

  // Envio msg de sucesso!
  res.send("Item updated successfully.")
})

// DELETE - [DELETE] /items/:id
app.delete("/items/:id", function (req, res) {
  // Acesso ao parâmetro de rota e corrigido o índice
  const id = req.params.id - 1;

  // Removido a informação a partir do índice
  delete items[id]

  // Envio msg de sucesso!
  res.send("Item deleted successfully.")
})

app.listen(3000, function () {
  console.log("App running on http://localhost:3000");
});
