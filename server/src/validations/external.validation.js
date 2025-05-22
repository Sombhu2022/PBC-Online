import { z } from "zod";

class ExternalValidation {
  // Create External
  create = z.object({
    body: z.object({
      user: z.string({ required_error: "User ID is required!" }).trim(),
      department: z.string({ required_error: "Department ID is required!" }).trim(),
      semester: z.string({ required_error: "Semester ID is required!" }).trim(),
      paperCode: z
        .string({ required_error: "Paper code is required!!" })
        .min(3, "Paper code must be at least 3 characters")
        .max(10, "Paper code should be within 10 characters")
        .trim(),
      paperName: z
        .string({ required_error: "Paper name is required!!" })
        .min(3, "Paper name must be at least 3 characters")
        .max(10, "Paper name should be within 10 characters")
        .trim(),
      doe: z
        .string({ required_error: "Date of exam is required!!" })
        .refine((val) => !isNaN(Date.parse(val)), {
          message: "Date of exam must be a valid date format!",
        }),
    }),
  });

  // Update External
  update = z.object({
    params: z.object({
      externalId: z.string({ required_error: "External ID is required!" }),
    }),
    body: z.object({
      user: z.string().optional(),

      department: z.string().optional(),

      semester: z.string().optional(),

      paperCode: z
        .string()
        .min(3, "Paper code must be at least 3 characters")
        .max(10, "Paper code should be within 10 characters")
        .trim()
        .optional(),

      paperName: z
        .string()
        .min(3, "Paper name must be at least 3 characters")
        .max(10, "Paper name should be within 10 characters")
        .trim()
        .optional(),

      doe: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
          message: "Date of exam must be a valid date format!",
        })
        .optional(),
    }),
  });

  // Delete External
  delete = z.object({
    params: z.object({
      externalId: z.string({ required_error: "External ID is required!" }),
    }),
    
  });
}

export default new ExternalValidation();
