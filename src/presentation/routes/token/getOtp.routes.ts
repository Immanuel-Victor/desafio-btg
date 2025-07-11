import { Router } from "express";
import { Request, Response } from "express";
import { GetOtpUseCase } from "../../../application/use-cases/token/get-otp/GetCurrentOtpUseCase";

export function getOtpRouter(useCase: GetOtpUseCase): Router {
  const router = Router();

  router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await useCase.execute({ id })
        
        res.status(200).json({ message: "Success", data: result });
    } catch (error) {
        res.status(400).json({ error: "Bad Request" });
    }
  });

  return router;
}