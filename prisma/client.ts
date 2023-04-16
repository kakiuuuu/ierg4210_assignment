import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

prisma.$use(async (params, next) => {
  const result = await next(params)
  if (params.model == 'Order') {
    if (params.action == 'findMany') {
      // console.log('result>>>>', result)
      result.forEach((order: { date: Date | String}) => {
        // console.log('order.date>>>', order.date)
        order.date = order.date.toLocaleString()
      })
    }
  }
  return result
})

export default prisma