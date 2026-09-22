import { z } from "zod";

export const budgetValues = [
  "under-100000",
  "100000-300000",
  "300000-500000",
  "over-500000",
  "undecided",
] as const;

export const budgetLabels: Record<(typeof budgetValues)[number], string> = {
  "under-100000": "〜10万円",
  "100000-300000": "10〜30万円",
  "300000-500000": "30〜50万円",
  "over-500000": "50万円〜",
  undecided: "未定・相談したい",
};

export const contactSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().max(254).pipe(z.email()),
    budget: z.enum(budgetValues),
    message: z.string().trim().min(10).max(5000),
    turnstileToken: z.string().min(1).max(2048),
  })
  .strict();

export type ContactInput = z.infer<typeof contactSchema>;
