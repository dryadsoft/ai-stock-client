"use server";
import { z } from "zod";

const checkUsername = (username: string) => !username.includes("potato");
const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "must be to string",
        required_error: "user name is required.",
      })
      .min(3, "Too short")
      .max(20, "Too long")
      .trim()
      .toLowerCase()
      .refine(checkUsername, "Don't use potato"),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(8)
      .max(20)
      .regex(
        passwordRegex,
        "Passwords must contain at least one UPERCASE, lowercase, number and special character #?!@$%^&*-"
      ),
    confirmPassword: z.string().min(8).max(20),
  })
  .refine(checkPassword, {
    message: "Both password different",
    path: ["confirmPassword"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  console.log(data);
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
