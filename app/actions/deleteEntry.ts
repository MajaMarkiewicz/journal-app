'use server'
import connectMongo from '@/utils/connect-mongo'
import JournalEntry from '@/models/JournalEntry'
import { getUserByClerkId } from '@/utils/auth'
import { revalidatePath } from 'next/cache'

async function deleteEntry(entryId: string) {
  await connectMongo()

  const user = await getUserByClerkId()
  if (!user || !user._id) throw new Error('User.id is missing')

  const deletedEntry = await JournalEntry.findOneAndDelete({
    _id: entryId,
    userId: user._id,
  })

  if (!deletedEntry) {
    throw new Error('Journal entry not found or unauthorized')
  }

  revalidatePath('/journal')
}

export default deleteEntry
