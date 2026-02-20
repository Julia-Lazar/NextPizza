import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const isProduction = process.env.NODE_ENV === "production";
const allowPublicKeyRetrieval =
  process.env.MYSQL_ALLOW_PUBLIC_KEY_RETRIEVAL === "true" ||
  (!isProduction && process.env.MYSQL_ALLOW_PUBLIC_KEY_RETRIEVAL !== "false");

const adapter = new PrismaMariaDb({
//   host: "136.114.97.120",

  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306,
  connectionLimit: 5,
  allowPublicKeyRetrieval,
})

export const prisma =
  globalForPrisma.prisma || new PrismaClient({adapter});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
