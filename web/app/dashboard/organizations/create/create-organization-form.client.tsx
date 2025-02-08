"use client";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { ZodError } from "zod";
import { FormModel, formSchema } from "./create-organization-form.model";
import { useAuthContext } from "@/components/auth-context/auth-context.client";
import { useRouter } from "next/navigation";

// Step 1: Define the TypeScript type for form data

// Step 2: Create the Zod schema for validation

export function CreateOrganizationFormClient() {
  const { refreshIdToken } = useAuthContext();
  const router = useRouter();
  const [formData, setFormData] = useState<FormModel>({
    name: "",
  });

  const [errors, setErrors] = useState<Partial<FormModel>>({
    name: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Validate the form data using the Zod schema
    try {
      formSchema.parse(formData);

      await fetch("create/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await refreshIdToken();
      router.back();
    } catch (err) {
      const zodError = err as ZodError;
      // Now TypeScript knows err is a ZodError
      const validationErrors = zodError.errors.reduce(
        (acc: { [key: string]: string }, issue: ZodError["issues"][number]) => {
          acc[issue.path[0]] = issue.message;
          return acc;
        },
        {}
      );
      setErrors(validationErrors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 items-center border shadow-sm rounded-sm flex flex-col gap-4 w-full max-w-80"
    >
      <h1 className="text-2xl font-semibold w-full">Create Organization</h1>
      <div className="w-full">
        <TextField
          label="Organization Name"
          className="flex-grow w-full"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && (
          <p className="text-red-600 font-semibold w-full">{errors.name}</p>
        )}
      </div>

      <div className="w-full flex gap-4">
        <Link href="/dashboard/organizations">
          <Button variant="outlined" type="submit" className="flex-grow">
            Cancel
          </Button>
        </Link>

        <Button variant="contained" type="submit" className="flex-grow">
          Create
        </Button>
      </div>
    </form>
  );
}
