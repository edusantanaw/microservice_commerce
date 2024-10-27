import * as dotnev from "dotenv";
import express from "express";
import prisma from "./config/prisma";
import producer from "./config/producer";
import { createCustomerController } from "./controllers/create-customer";

dotnev.config();

const PORT = process.env.PORT ?? 3001;

const app = express();

(async () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  await producer.connect();
  await prisma.$connect().then(() => console.log("Database connectedS"));

  app.post("/api/customers", createCustomerController);

  app.listen(PORT, () => {
    console.log(`Server running at: ${PORT}`);
  });
})();
