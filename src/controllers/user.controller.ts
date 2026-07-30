import type { Request, Response } from "express";
import firestore = require("firebase-admin/firestore");

type User = {
  id: number;
  nome: string;
  email: string;
};

let usuarios: User[] = [];
let id = 0;

async function listarUsuarios(req: Request, res: Response) {
  const snapshot = await firestore.getFirestore().collection("users").get();
  const usuarios = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.send(usuarios);
}

function buscarUsuario(req: Request, res: Response) {
  let userId = Number(req.params.id);
  let user = usuarios.find((user) => user.id === userId);

  res.send(user);
}

async function criarUsuario(req: Request, res: Response) {
  let user = req.body;
  const userSalvo = await firestore.getFirestore().collection("users").add(user); 

  res.send({
    message: `Usuário ${userSalvo.id} criado com sucesso`,
  });
}

function atualizarUsuario(req: Request, res: Response) {
  let userId = Number(req.params.id);
  let user = req.body;
  let indexOf = usuarios.findIndex((user) => user.id === userId);

  if (indexOf === -1) {
    res.status(404).send({
      message: "Usuário não encontrado",
    });
    return;
  }

  let usuarioEncontrado = usuarios[indexOf];

  if (!usuarioEncontrado) {
    res.status(404).send({
      message: "Usuário não encontrado",
    });
    return;
  }

  usuarioEncontrado.nome = user.nome;
  usuarioEncontrado.email = user.email;

  res.send({
    message: "Usuário alterado com sucesso!",
  });
}

function excluirUsuario(req: Request, res: Response) {
  let userId = Number(req.params.id);
  let indexOf = usuarios.findIndex((user) => user.id === userId);

  if (indexOf === -1) {
    res.status(404).send({
      message: "Usuário não encontrado",
    });
    return;
  }

  usuarios.splice(indexOf, 1);

  res.send({
    message: "Usuário excluído com sucesso!",
  });
}

export = {
  listarUsuarios,
  buscarUsuario,
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
};