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
  res.send(items)
})

// CREATE - [POST] /items
/*app.post("/items", function (req, res) {
  res.send("Create item")
})*/

app.post("/items", function (req, res) {
  //Extrair informação do corpo da requisição
  const item = req.body.name

  //Inserir info na lista
  items.push(item)

  //Envio msg de sucesso!
  res.send("Item created successfully")
})

app.listen(3000, function () {
  console.log("App running on http://localhost:3000");
});
