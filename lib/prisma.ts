import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Strip sslmode=require so it doesn't override the ssl config below
const connectionString = process.env.DATABASE_URL!.replace("?sslmode=require", "").replace("&sslmode=require", "");

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
});

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
};

const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter: new PrismaPg(pool),
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;