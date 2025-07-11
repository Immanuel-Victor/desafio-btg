import { Router } from "express";
import { CreateTokenUseCase } from "../../../application/use-cases/token/create-token/CreateTokenUseCase";
import { Request, Response } from "express";

export function createTokenRouter(useCase: CreateTokenUseCase): Router {
  const router = Router();

/**
 * @openapi
 * /token:
 *   post:
 *     summary: Create a new token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               secret:
 *                 type: string
 *               expirationTime:
 *                 type: string
 *     responses:
 *       201:
 *         description: Token created
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
 *                     tokenId:
 *                       type: string
 *                     otp:
 *                       type: string
 */
  router.post('/', async (req: Request, res: Response) => {
    try {
      const { secret, expirationTime } = req.body;
      const result = await useCase.execute({ secret, expirationTime })

      res.status(201).json({ message: "Success", data: result });
    } catch (error) {
      res.status(400).json({ error: "Bad Request" });
    }
  });

  return router;
}