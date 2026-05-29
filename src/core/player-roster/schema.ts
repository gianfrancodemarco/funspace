import { z } from "zod";

export const playerRosterSchema = z.array(z.string().trim().min(1));

export type PlayerRoster = z.infer<typeof playerRosterSchema>;
