import { randomUUID } from "crypto";
import prisma from "../config/prisma";

export async function createCustomerService(data: any) {
  const emailAlreadyUsed = await prisma.customer.findFirst({
    where: {
      email: data.email,
    },
  });
  if (emailAlreadyUsed) throw new Error("Email já está em uso");

  const cpfCnpjAlreadyUsed = await prisma.customer.findFirst({
    where: {
      cpfCnpj: data.cpfCnpj,
    },
  });

  if (cpfCnpjAlreadyUsed) throw new Error("Email já está em uso");

  const customer = await prisma.customer.create({
    data: {
      id: randomUUID(),
      ...data,
    },
  });
  return customer;
}
