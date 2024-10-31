"use server";

export async function logError(e: Error) {
  console.error("There was an error", new Date(), e);
}
