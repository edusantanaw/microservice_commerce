import { Request, Response } from "express";
import z from "zod";
import { createCustomerService } from "../services/create-customer";
import { notifyTopic } from "../services/notify";

export async function createCustomerController(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const schema = validateCustomerSchema(req.body);
    const customer = await createCustomerService(schema);
    res.status(201).json(customer);
    await notifyTopic("customer", customer);
  } catch (error) {
    if (error instanceof z.ZodError)
      return res.status(400).json({ message: error.errors });
    const { message } = error as Error;
    res.status(400).send(message);
  }
}

function validateCustomerSchema(data: unknown) {
  const schema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    cpfCnpj: z.string(),
    phone: z.string(),
  });
  return schema.parse(data);
}
