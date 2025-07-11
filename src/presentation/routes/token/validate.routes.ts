import { Router } from "express";
import { Request, Response } from "express";
import { ValidateTokenUseCase } from "../../../application/use-cases/token/validate-token/ValidateTokenUseCase";

export function validateTokenRouter(useCase: ValidateTokenUseCase): Router {
  const router = Router();

  /**
   * @openapi
   * /token/validate:
   *   post:
   *     summary: Validate an OTP string for a given token ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - tokenId
   *               - otpString
   *             properties:
   *               tokenId:
   *                 type: string
   *               otpString:
   *                 type: string
   *     responses:
   *       200:
   *         description: Validation result
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 data:
   *                   type: object
   *                   properties:
   *                     isValid:
   *                       type: boolean
   *       400:
   *         description: Bad request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   */
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