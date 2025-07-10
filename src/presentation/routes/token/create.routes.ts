import { Router } from "express";
import { CreateTokenUseCase } from "../../../application/use-cases/token/create-token/CreateTokenUseCase";
import { Request, Response } from "express";

export function createTokenRouter(useCase: CreateTokenUseCase): Router {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    try {
        const { secret, expirationTime } = req.body;
        const result = await useCase.execute({ secret, expirationTime })
        
        res.status(200).json({ message: "Success", data: result });
    } catch (error) {
        res.status(400).json({ error: "Bad Request" });
    }
  });

  return router;
}