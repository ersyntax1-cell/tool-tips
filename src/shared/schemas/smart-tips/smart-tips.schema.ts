import { z } from "zod";

export const toolTipSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters"),
  description: z.string().min(40, "Description must be at least 15 characters")
});

export type ToolTipForm = z.infer<typeof toolTipSchema>;
