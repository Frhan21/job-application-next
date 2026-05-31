import prisma from "@/lib/prisma";
import { CreateUserRequest, UpdateUserRequest } from "../types/user";

export const userRepository = {
    async getByEmail(email: string) {
        return await prisma.user.findUnique({ where: { email } });
    },

    async getById(id: string) {
        return await prisma.user.findUnique({ where: { id } });
    },

    async create(data: CreateUserRequest) {
        return await prisma.user.create({ data });
    },

    async update(id: string, data: UpdateUserRequest) {
        return await prisma.user.update({
            where: { id },
            data,
        });
    },

    async delete(id: string) {
        return await prisma.user.delete({ where: { id } });
    },
};