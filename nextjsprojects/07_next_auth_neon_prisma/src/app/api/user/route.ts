import { prisma } from '../../lib/db';

const users = await prisma.user.findMany()

export async function GET() {
  return new Response(JSON.stringify(users), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
