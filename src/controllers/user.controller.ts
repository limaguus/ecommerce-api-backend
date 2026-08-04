import type { Request, Response } from "express";
import getFirestore = require("firebase-admin/firestore");
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

async function buscarUsuario(req: Request, res: Response) {
  const userId = String(req.params.id);

  const doc = await firestore.getFirestore().collection("users").doc(userId).get();

  if (!doc.exists) {
    res.status(404).send({ message: "Usuário não encontrado" });
    return;
  }

  res.send({
    id: doc.id,
    ...doc.data(),
  });
}
async function criarUsuario(req: Request, res: Response) {
  let user = req.body;
  const userSalvo = await firestore.getFirestore().collection("users").add(user); 

  res.send({
    message: `Usuário ${userSalvo.id} criado com sucesso`,
  });
}

async function atualizarUsuario(req: Request, res: Response) {
  const userId = String(req.params.id);
  const user = req.body;

  const docRef = firestore.getFirestore().collection("users").doc(userId);
  const doc = await docRef.get();

  if (!doc.exists) {
    res.status(404).send({
      message: "Usuário não encontrado",
    });
    return;
  }

  await docRef.update({
    nome: user.nome,
    email: user.email,
  });

  res.send({
    message: "Usuário alterado com sucesso!",
  });
}

async function excluirUsuario(req: Request, res: Response) {
  const userId = String(req.params.id);

  const docRef = firestore.getFirestore().collection("users").doc(userId);
  const doc = await docRef.get();

  if (!doc.exists) {
    res.status(404).send({
      message: "Usuário não encontrado",
    });
    return;
  }

  await docRef.delete();

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