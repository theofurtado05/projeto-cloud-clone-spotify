import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/services/database";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário.
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
 *               name:
 *                type: string
 *               phone:
 *                type: string
 *     responses:
 *       200:
 *         description: Registro bem-sucedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso.
 *       400:
 *         description: E-mail já está em uso.
 *       500:
 *         description: Erro interno do servidor.
 */


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await req.json();

        const existingUser = await prisma.users.findUnique({
            where: {
                email: data.email,
            },
        });

        if (existingUser) {
            throw new Error("E-mail já está em uso");
        }

        const freePlan = await prisma.plans.findUnique({
            where: {
                id: 1
            }
        })

        if (!freePlan) {
            await prisma.plans.create({
                data: {
                    name: 'Free',
                    price: 0,
                }
            })
        }
        

        // Hash da senha antes de salvar no banco de dados
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const phoneFormatado = data.phone
        // Cria um novo usuário no banco de dados
        const newUser = await prisma.users.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                phone: phoneFormatado,
                current_plan_id: 1,
            },
        });

        //criar playlist favorites
        const playListFavorites = await prisma.playlists.create({
            data: {
                name: 'Favorites',
                user_id: newUser.id,
            }
        })
        
        //criar assinatura
        const subscription = await prisma.signatures.create({
            data: {
                user_id: newUser.id,
                plan_id: 1,
                start_date: new Date(),
                end_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
            }
        })

        const token = jwt.sign({ userId: newUser.id }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', { expiresIn: '12h' });

        // Registro bem-sucedido, retornando o token
        return NextResponse.json({
            message: "Registro bem-sucedido",
            token,
            userid: newUser.id,
            plan: newUser.current_plan_id
        });
    } catch (err: unknown) {
        const error = (err as Error).toString();
        console.log(error)
        return NextResponse.json({
            message: error,
        }, { status: 500 });
    }
}
