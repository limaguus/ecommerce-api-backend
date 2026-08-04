import express = require("express");
import routes = require("./routes");
import serviceAccount = require("../firebase-adminsdk.json");

const errorHandler = require("./middlewares/error-handler.middleware");
const { initializeApp, cert } = require("firebase-admin/app");

initializeApp({
  credential: cert(serviceAccount),
  projectId: "e-commerce-21957",
});

const app = express();

app.use(express.json());
app.use(routes);
errorHandler(app);

app.listen(3000, () => {
  console.log("Servidor ativo na porta 3000");
});