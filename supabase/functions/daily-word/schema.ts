import { z } from "npm:zod@4";

function isValidIsoDate(dateStr: string): boolean {
  const parsed = new Date(`${dateStr}T00:00:00Z`);

  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === dateStr;
}

export const difficultySchema = z.enum([
  "facil",
  "medio",
  "dificil",
  "muito_dificil",
]);

export const isoDateSchema = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD")
  .refine(isValidIsoDate, "Invalid date format. Use YYYY-MM-DD");

export const dateQuerySchema = z.object({
  date: isoDateSchema.optional(),
});

export const scheduleEntrySchema = z.object({
  date: isoDateSchema,
  word: z.string().trim().min(1),
  difficulty: difficultySchema,
  difficultyLabel: z.string().trim().min(1),
  puzzle: z.number().int().positive(),
});

export const scheduleFileSchema = z.object({
  days: z.array(scheduleEntrySchema).min(1),
});

export const scheduleRowSchema = z.object({
  date: isoDateSchema,
  word: z.string().trim().min(1),
  difficulty: difficultySchema,
  difficulty_label: z.string().trim().min(1),
  puzzle: z.number().int().positive(),
});