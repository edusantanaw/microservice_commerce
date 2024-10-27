import { Request, Response } from "express";
import z from "zod";
import { createCustomerService } from "../services/create-customer";
import { notifyTopic } from "../services/notify";

export async function createCustomerController(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const schema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      cpfCnpj: z.string(),
      phone: z.string(),
    });
    const parsed = schema.parse(req.body);
    const customer = await createCustomerService(parsed);
    await notifyTopic("customer", customer);
    return res.status(201).json(customer);
  } catch (error) {
    if (error instanceof z.ZodError)
      return res.status(400).json({ message: error.errors });
    const { message } = error as Error;
    return res.status(400).send(message);
  }
}
