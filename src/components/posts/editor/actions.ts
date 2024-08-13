"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createPostSchema } from "@/lib/validation";

export async function submitPost(input: string) {
  // Check if there is a user
  const { user } = await validateRequest();

  // Throw error because user should be directed (does not need to be readable)
  if (!user) throw Error("Unauthorized");

  // Use posts schema to capture content
  const { content } = createPostSchema.parse({ content: input });

  // Post content to db using validated user
  await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
  });
}
