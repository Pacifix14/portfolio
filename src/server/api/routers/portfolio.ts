import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const portfolioRouter = createTRPCRouter({
  contact: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        message: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      // TODO: Send email or save to database
      console.log("Contact form submission:", input);
      return {
        success: true,
        message: "Thank you for your message!",
      };
    }),
});
