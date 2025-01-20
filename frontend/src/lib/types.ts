import z from "zod";

export type User = {
  id: number;
  username: string;
  email: string;
  password?: string;
  pincode: string;
  uid: string;
  isAdmin: boolean;
  beginDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export const  CreateUserSchema = z.object({
  username: z.string().min(1, {message: "Username is required"}),
  email: z.string().min(1, {message: "Email is required"}).email("Should be a valid email"),
  password: z.string().min(6, {message: "Password should be at least 6 characters"}),
  uid: z.string().min(1, {message: "UID is required"}),
  isTemporary: z.boolean(),
  beginDate: z.string().optional().or(z.literal('')).or(z.literal(null)),
  endDate: z.string().optional().or(z.literal('')).or(z.literal(null)),
});