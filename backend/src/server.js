import "dotenv/config";
import app from "./app.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Student Management API Running ✅");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

