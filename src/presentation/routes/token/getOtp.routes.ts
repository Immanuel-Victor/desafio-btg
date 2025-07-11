import { Router } from "express";
import { Request, Response } from "express";
import { GetOtpUseCase } from "../../../application/use-cases/token/get-otp/GetCurrentOtpUseCase";

export function getOtpRouter(useCase: GetOtpUseCase): Router {
  const router = Router();

  /**
   * @openapi
   * /token/otp/{id}:
   *   get:
   *     summary: Get the current OTP string value for a registered token
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the token to retrieve OTP for
   *     responses:
   *       200:
   *         description: OTP fetched successfully
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
   *                     otp:
   *                       type: string
   *                     expiresIn:
   *                       type: number
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