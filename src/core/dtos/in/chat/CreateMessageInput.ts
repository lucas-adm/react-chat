import { createMessageData } from "@/core/schemas";
import z from "zod";

export type CreateMessageInput = z.infer<typeof createMessageData>;