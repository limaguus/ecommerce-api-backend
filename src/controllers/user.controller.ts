import type { Request, Response, NextFunction } from "express";
import firestore = require("firebase-admin/firestore");
import ValidationError = require("../errors/validation.error");
import NotFoundError = require("../errors/not-found.error");

async function listarUsuarios(req: Request, res: Response, next: NextFunction) {
  try {
    const snapshot = await firestore.getFirestore().collection("users").get();
    const usuarios = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res.send(usuarios);
  } catch (error) {
    next(error);
  }
}

async function buscarUsuario(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = String(req.params.id);

    const doc = await firestore.getFirestore().collection("users").doc(userId).get();

    if (!doc.exists) {
      throw new NotFoundError("Usuário não encontrado");
    }

    res.send({
      id: doc.id,
      ...doc.data(),
    });
  } catch (error) {
    next(error);
  }
}

async function criarUsuario(req: Request, res: Response, next: NextFunction) {
  try {
    let user = req.body;
    if (!user.email || user.email?.length === 0) {
      throw new ValidationError("Email Obrigatório");
    }
    const userSalvo = await firestore.getFirestore().collection("users").add(user);

    res.status(201).send({
      message: `Usuário ${userSalvo.id} criado com sucesso`,
    });
  } catch (error) {
    next(error);
  }
}

async function atualizarUsuario(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = String(req.params.id);
    const user = req.body;

    const docRef = firestore.getFirestore().collection("users").doc(userId);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundError("Usuário não encontrado");
    }

    await docRef.update({
      nome: user.nome,
      email: user.email,
    });

    res.send({
      message: "Usuário alterado com sucesso!",
    });
  } catch (error) {
    next(error);
  }
}

async function excluirUsuario(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = String(req.params.id);

    const docRef = firestore.getFirestore().collection("users").doc(userId);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundError("Usuário não encontrado");
    }

    await docRef.delete();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export = {
  listarUsuarios,
  buscarUsuario,
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
};