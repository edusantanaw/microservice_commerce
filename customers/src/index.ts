import { randomUUID } from "crypto";
import express from "express";
import * as dotnev from "dotenv";
import prisma from "./prisma";
import kafka from "./kafka";
import z from "zod";
import { Customer } from "@prisma/client";

dotnev.config();

const PORT = process.env.PORT ?? 3001;

const app = express();
const producer = kafka.producer();

async function notifyConsumers(data: Customer) {
  try {
    const res = await producer.send({
      topic: "customer",
      messages: [
        {
          value: JSON.stringify(data),
        },
      ],
      
    });
    console.log(res)
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  await producer.connect();

  await prisma.$connect().then(() => console.log("Database connectedS"));

  app.post("/api/customers", async (req, res): Promise<any> => {
    try {
      const schema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        cpfCnpj: z.string(),
        phone: z.string(),
      });
      const parsed = schema.parse(req.body);
      const emailAlreadyUsed = await prisma.customer.findFirst({
        where: {
          email: parsed.email,
        },
      });
      if (emailAlreadyUsed) return res.status(400).json("Email já está em uso");
      const cpfCnpjAlreadyUsed = await prisma.customer.findFirst({
        where: {
          cpfCnpj: parsed.cpfCnpj,
        },
      });

      if (cpfCnpjAlreadyUsed)
        return res.status(400).json("Email já está em uso");

      const customer = await prisma.customer.create({
        data: { ...parsed, id: randomUUID() },
      });
      await notifyConsumers(customer);
      return res.status(201).json(customer);
    } catch (error) {
        console.log(error)
      res.status(400).json(error);
      return;
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running at: ${PORT}`);
  });
})();
