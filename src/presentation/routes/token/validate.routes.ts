import { Router } from "express";
import { Request, Response } from "express";
import { ValidateTokenUseCase } from "../../../application/use-cases/token/validate-token/ValidateTokenUseCase";

export function validateTokenRouter(useCase: ValidateTokenUseCase): Router {
  const router = Router();

  router.post('/validate', async (req: Request, res: Response) => {
    try {
        const { tokenId, otpString } = req.body;
        const result = await useCase.execute({ id: tokenId, otpString })
        
        res.status(200).json({ message: "Success", data: result });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Bad Request" });
    }
  });

  return router;
}