import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/services/database";

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


