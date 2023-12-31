const express = require("express");
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

const url = process.env.DATABASE_URL;
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

  app.get("/items", async function (req, res) {
    const documents = await collection.find().toArray()

    res.send(documents)
    //res.send(items.filter(Boolean));
  });

  // READ BY ID - [GET] /items/:id
  app.get("/items/:id", async function (req, res) {
    // Acessar o parâmetro de rota ID
    // Subtrair 1 (um) para corrigir o índice (array) da lista que começa em 0 (zero)
    //const id = req.params.id - 1;
    //const id = +req.params.id;
    const id = req.params.id;

    // Acesso ao item na lista a partir do index
    //const item = items[id]

    //const item = items.find(function (elemento) {
    //  return elemento.id === id;
    //});

    // Busca o documento no collection
    const item = await collection.findOne({
      _id: new ObjectId(id)
    })

    // Exibe o item obtido
    res.send(item);
  });

  // CREATE - [POST] /items
  /*app.post("/items", function (req, res) {
  res.send("Create item")
})*/

  app.post("/items", async function (req, res) {
    // Extrair informação do corpo da requisição
    //const item = req.body.name
    const item = req.body;

    if (!item || !item.name || !item.imageUrl) {
      return res.status(400).send({
        message: "name & imageUrl are required."
      })
    }

    // Adicionar id
    //item.id = items.length + 1;

    // Inserir info na lista
    //items.push(item);

    // Inserir o item na collection
    await collection.insertOne(item)

    // Envio msg de sucesso!
    //res.send("Item created successfully")

    // Devolve objeto adiciona
    //res.send(item);
    res.status(201).send(item);
  });

  // UPDATE - [PUT] /items/:id
  app.put("/items/:id", async function (req, res) {
    // Acesso ao parâmetro de rota e corrigido o índice
    //const id = req.params.id - 1;
    //const id = +req.params.id;
    const id = req.params.id;

    // Obtemos o novo item a partir do corpo da requisição
    //const newItem = req.body.name
    const newItem = req.body;

    // Colocando o novo item na mesma posição do item anterior
    //items[id] = newItem
    //const index = items.findIndex(function (elemento) {
    //  return elemento.id === id;
    //});

    //items[index] = {
    //  ...items[index],
    //  ...newItem,
    //};

    // Atualizar o documento na collection
    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: newItem
      }
    )

    // Envio msg de sucesso!
    //res.send("Item updated successfully.")

    // Devolve objeto adiciona
    //res.send(items[index]);
    res.send(newItem);
  });

  // DELETE - [DELETE] /items/:id
  app.delete("/items/:id", async function (req, res) {
    // Acesso ao parâmetro de rota e corrigido o índice
    //const id = req.params.id - 1;
    const id = req.params.id;

    //const index = items.findIndex(function (element) {
    //  return element.id === id;
    //});
    // Removido a informação a partir do índice
    //delete items[id]
    //delete items[index];

    await collection.deleteOne({ _id: new ObjectId(id) })

    // Envio msg de sucesso!
    res.send("Item deleted successfully.");
  });

  const port = process.env.PORT || 3000

  app.listen(port, function () {
    console.log(`App running on http://localhost:${port}`);
  });
}

main();
