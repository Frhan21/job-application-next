import { candidatesRepository } from "../repository/candidates.repository";
import { CreateCandidateInput, UpdateCandidateInput, createCandidateSchema, updateCandidateSchema } from "../schemas/candidate.schema";

export const candidatesService = {
    async getCandidates() {
        return await candidatesRepository.findAll();
    },

    async getCandidateById(id: string) {
        const candidate = await candidatesRepository.findById(id);
        if (!candidate) {
            throw new Error("Candidate not found");
        }
        return candidate;
    },

    async createCandidate(data: CreateCandidateInput) {
        const parsed = createCandidateSchema.parse(data);
        
        // Check email uniqueness
        const existing = await candidatesRepository.findByEmail(parsed.email);
        if (existing) {
            throw new Error("A candidate with this email already exists");
        }
        
        return await candidatesRepository.create(parsed);
    },

    async updateCandidate(id: string, data: UpdateCandidateInput) {
        const parsed = updateCandidateSchema.parse(data);
        
        // Verify existence
        const existing = await this.getCandidateById(id);
        
        // Check email uniqueness if changing email
        if (parsed.email && parsed.email !== existing.email) {
            const emailInUse = await candidatesRepository.findByEmail(parsed.email);
            if (emailInUse) {
                throw new Error("A candidate with this email already exists");
            }
        }
        
        return await candidatesRepository.update(id, parsed);
    },

    async deleteCandidate(id: string) {
        // Verify existence
        await this.getCandidateById(id);
        
        // Applications will be cascaded if DB is configured so, or prisma delete handles it
        // Note: In a production app, we might want to manually delete applications first 
        // if cascade delete is not set on the DB level.
        return await candidatesRepository.delete(id);
    }
};
