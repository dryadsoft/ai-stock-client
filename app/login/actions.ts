"use server";

export async function handleForm(prevState: any, formData: FormData) {
  console.log("==============================");
  console.log(prevState);
  console.log(formData.get("email"), formData.get("password"));
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("I Login IN.");
  return {
    errors: ["fail log in.", "too short password"],
  };
}
