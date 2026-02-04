import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaMariaDb({
//   host: "136.114.97.120",

  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306,
  connectionLimit: 5,
})

export const prisma =
  globalForPrisma.prisma || new PrismaClient({adapter});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;