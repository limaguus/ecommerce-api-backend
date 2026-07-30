import express = require("express");
import userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/", userController.listarUsuarios);
router.get("/:id", userController.buscarUsuario);
router.post("/", userController.criarUsuario);
router.put("/:id", userController.atualizarUsuario);
router.delete("/:id", userController.excluirUsuario);

export = router;