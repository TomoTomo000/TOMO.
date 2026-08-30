import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact.schema";

export const submitContact = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    if (data.website) {
      return {
        success: true,
      };
    }

    return {
      success: true,
    };
  });