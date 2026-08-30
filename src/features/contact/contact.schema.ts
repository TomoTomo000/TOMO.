import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "お名前を入力してください")
    .max(100, "お名前は100文字以内で入力してください"),

  email: z
    .email("メールアドレスの形式が正しくありません")
    .max(254, "メールアドレスは254文字以内で入力してください"),

  budget: z.enum([
    "under-100000",
    "100000-300000",
    "300000-500000",
    "over-500000",
    "undecided",
  ]),

  message: z
    .string()
    .trim()
    .min(10, "お問い合わせ内容は10文字以上で入力してください")
    .max(5000, "お問い合わせ内容は5000文字以内で入力してください"),

  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;