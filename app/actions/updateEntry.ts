'use server'
import connectMongo from '@/utils/connect-mongo'
import JournalEntry from '@/models/JournalEntry'
import { getUserByClerkId } from '@/utils/auth'
import type { Category, JournalEntryApiPost } from '@/types/journalEntry'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

async function updateEntry(entryId: string, formData: FormData) {
  await connectMongo()

  const user = await getUserByClerkId()
  if (!user || !user._id) throw new Error('User.id is missing')

  const existingEntry = await JournalEntry.findById(entryId)

  if (!existingEntry) throw new Error('Property not found')

  const entryData: JournalEntryApiPost = {
    userId: user._id,
    date: new Date(formData.get('date') as string),
    title: formData.get('title') as string,
    content: formData.get('content') as string | undefined,
    category: formData.get('category') as Category,
    additionalCategory: formData.get('additionalCategory')
      ? (formData.get('additionalCategory') as Category)
      : undefined,
    importantEvent: formData.get('importantEvent') === 'on',
  }

  await JournalEntry.findByIdAndUpdate(entryId, entryData)

  revalidatePath('/')

  redirect('/journal')
}

export default updateEntry
