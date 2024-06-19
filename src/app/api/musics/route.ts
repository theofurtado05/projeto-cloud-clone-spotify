export const dynamic = 'force-dynamic';
import { prisma } from "@/services/database";
import { NextRequest, NextResponse } from "next/server";


/**
 * @swagger
 * /api/musics:
 *   get:
 *     summary: Obtém todas as músicas
 *     description: Retorna uma lista de todas as músicas, incluindo as informações dos artistas.
 *     responses:
 *       200:
 *         description: Lista de músicas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   artist:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                   album:
 *                     type: string
 *                   duration:
 *                     type: integer
 *       500:
 *         description: Erro interno do servidor.
 */
export async function GET(req: NextRequest){
    try {
        const musics = await prisma.musics.findMany({
            include: {
                artist: true,            
            }
        })
        return NextResponse.json(musics)
    } catch (err) {
        throw NextResponse.json(err, { status: 500 })
    }
}