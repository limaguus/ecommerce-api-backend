import express = require("express");

const app = express();

app.use(express.json());

let usuarios: {id: number, nome: string, email:string} [] = [];

app.get("/", (req, res) => {
  res.send("Hello word, backend");
});

let id = 0;
let user: {id: number, nome: string, email: string}[] = [];

app.get("/users", (req, res) => {
  res.send(usuarios);
});

app.get("/users/:id", (req, res) => {
let userId = Number (req.params.id);
let user = usuarios.find(user => user.id === userId);
res.send(user);
});
app.post("/users", (req, res) => {
  let user = req.body;
  user.id = ++id;
  usuarios.push(user);

  res.send({
    message: "Usuário criado com sucesso",
  });
});
app.listen(3000, () => {
  console.log("Servidor ativo na porta 3000");
});