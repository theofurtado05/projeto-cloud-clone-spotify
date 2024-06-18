import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/services/database";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza o login de um usuário.
 *     tags:
 *       - Login Methods
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso.
 *                 token:
 *                   type: string
 *                   description: Token de autenticação JWT.
 *       401:
 *         description: Senha incorreta.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await req.json();

        // Procura o user com o email fornecido
        const user = await prisma.users.findUnique({
            where: {
                email: data.email,
            },
        });

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        // Verifica se a senha fornecida corresponde à senha no banco de dados
        const senhaCorreta = await bcrypt.compare(data.password, user.password);

        if (!senhaCorreta) {
            return NextResponse.json({
                message: "Senha incorreta",
            }, { status: 401 });
        }   

        //3f8c4e1b08b74f36b9f9e3b4e2a8c7e0

        //@ts-ignore
        const token = jwt.sign({ userId: user.id },  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" , { expiresIn: '12h' });

        // Autenticação bem-sucedida, retornando o token
        return NextResponse.json({
            message: "Login bem-sucedido",
            token: token,
            userid: user.id,
            plan: user.current_plan_id,
            user: {
                email: user.email,
                name: user.name,
                phone: user.phone,
                current_plan_id: user.current_plan_id,
            }

        });
    } catch (err: unknown) {
        const error = (err as Error).toString();
        console.log(error)
        return NextResponse.json({
            message: error,
        }, { status: 500 });
    }
}
