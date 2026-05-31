export interface User {
    id: string;
    name: string | null;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateUserRequest = Omit<User, "id" | "createdAt" | "updatedAt">;

export type UpdateUserRequest = Partial<Omit<User, "id" | "createdAt" | "updatedAt">>;