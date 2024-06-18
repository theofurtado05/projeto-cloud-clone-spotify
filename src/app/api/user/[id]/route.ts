import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/services/database";


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtém informações do usuário pelo ID
 *     description: Retorna as informações do usuário incluindo o plano atual, excluindo a senha.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 name:
 *                   type: string
 *                 current_plan_id:
 *                   type: integer
 *                 currentPlan:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *       404:
 *         description: Usuário não encontrado.
 *       400:
 *         description: ID do usuário não fornecido.
 *       500:
 *         description: Erro interno do servidor.
 */
export async function GET(req: NextRequest, res: NextResponse){
    try {
        const userId = req.nextUrl.pathname.split('/').pop();
        
        if (!userId) {
            throw new Error("ID do usuário não fornecido");
        }

        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(userId, 10),
            },
           
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const currentPlan = await prisma.plans.findUnique({
            where: {
                id: user.current_plan_id
            }
        });

        const currentUser = {
            ...user,
            password: null,
            currentPlan: {
                ...currentPlan
            }
        }

        return NextResponse.json(currentUser);
    } catch (err) {
        throw err
    }
}


