import z from "zod";

export const createMessageData = z.object({
    content: z.string().trim().min(1)
})