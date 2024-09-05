'use server'
import connectMongo from "@/utils/connect-mongo"
import JournalEntry from "@/models/JournalEntry"
import { getUserByClerkId } from "@/utils/auth"
import type { Category, JournalEntryApiPost } from "@/types/journalEntry"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

async function addEntry(formData: FormData): Promise<void> {
  await connectMongo()

  const user = await getUserByClerkId()
  if (!user || !user._id) throw new Error('User.id is missing')

  const entryData: JournalEntryApiPost = {
    userId: user._id,
    title: formData.get('title') as string,
    content: formData.get('content') as string | undefined,
    category: formData.get('category') as Category,
    additionalCategory: formData.get('additionalCategory') ? formData.get('additionalCategory') as Category : undefined
  };

  const newEntry = new JournalEntry(entryData)
  await newEntry.save();

  revalidatePath('/')

  redirect('/journal')
}

export default addEntry;
