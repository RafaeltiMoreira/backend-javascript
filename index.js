const express = require("express");
const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://RafaTI:zyWyGIVmw5hLbO1z@cluster0.3rntpik.mongodb.net";
const client = new MongoClient(url);
const dbName = "db-semana-backend-javascript";

async function main() {
  // Conexão com o Banco de Dados
  console.info("Conectando ao banco de dados...")
  client.connect()
  console.info("Banco de Dados conectado com sucesso!")

  const db = client.db(dbName)
  const collection = db.collection("items")

  // Inicialização do express
  const app = express();

  app.use(express.json());

  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  app.get("/oi", function (req, res) {
    res.send("Olá, mundo!");
  });

  //CRUD de lista DevMon

  //const items = ["Java", "Android", "Kotlin", "Express", "NestJS"]
  const items = [
    {
      id: 1,
      name: "Java",
      imageUrl: "https://salvatore.academy/devmon/1_java.png",
    },
    {
      id: 2,
      name: "Kotlin",
      imageUrl: "https://salvatore.academy/devmon/2_kotlin.png",
    },
  ];

  // READ ALL - [GET] /items

  app.get("/items", function (req, res) {
    res.send(items.filter(Boolean));
  });

  // READ BY ID - [GET] /items/:id
  app.get("/items/:id", function (req, res) {
    // Acessar o parâmetro de rota ID
    // Subtrair 1 (um) para corrigir o índice (array) da lista que começa em 0 (zero)
    //const id = req.params.id - 1;

    const id = +req.params.id;

    // Acesso ao item na lista a partir do index
    //const item = items[id]

    const item = items.find(function (elemento) {
      return elemento.id === id;
    });

    // Exibe o item obtido
    res.send(item);
  });

  // CREATE - [POST] /items
  /*app.post("/items", function (req, res) {
  res.send("Create item")
})*/

  app.post("/items", function (req, res) {
    // Extrair informação do corpo da requisição
    //const item = req.body.name
    const item = req.body;

    // Adicionar id
    item.id = items.length + 1;

    // Inserir info na lista
    items.push(item);

    // Envio msg de sucesso!
    //res.send("Item created successfully")

    // Devolve objeto adiciona
    res.send(item);
  });

  // UPDATE - [PUT] /items/:id
  app.put("/items/:id", function (req, res) {
    // Acesso ao parâmetro de rota e corrigido o índice
    //const id = req.params.id - 1;
    const id = +req.params.id;

    // Obtemos o novo item a partir do corpo da requisição
    //const newItem = req.body.name
    const newItem = req.body;

    // Colocando o novo item na mesma posição do item anterior
    //items[id] = newItem
    const index = items.findIndex(function (elemento) {
      return elemento.id === id;
    });

    items[index] = {
      ...items[index],
      ...newItem,
    };

    // Envio msg de sucesso!
    //res.send("Item updated successfully.")

    // Devolve objeto adiciona
    res.send(items[index]);
  });

  // DELETE - [DELETE] /items/:id
  app.delete("/items/:id", function (req, res) {
    // Acesso ao parâmetro de rota e corrigido o índice
    //const id = req.params.id - 1;
    const id = req.params.id;

    const index = items.findIndex(function (element) {
      return element.id === id;
    });
    // Removido a informação a partir do índice
    //delete items[id]
    delete items[index];

    // Envio msg de sucesso!
    res.send("Item deleted successfully.");
  });

  app.listen(3000, function () {
    console.log("App running on http://localhost:3000");
  });
}

main();
