import express from "express";
import cors from "cors";
import patientRoutes from "./routes/patientRoutes.js";
import userRoutes from "./routes/patientRoutes.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/patient", patientRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
