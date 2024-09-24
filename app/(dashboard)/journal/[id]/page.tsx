import updateEntry from '@/app/actions/updateEntry'
import EntryAddEditForm from '@/app/components/EntryAddEditForm'
import JournalEntry from '@/models/JournalEntry'
import type { JournalEntryApiGet } from '@/types/journalEntry'
import { getUserByClerkId } from '@/utils/auth'
import connectMongo from '@/utils/connect-mongo'

const EditEntryPage: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  await connectMongo()

  const { _id: userId } = await getUserByClerkId()
  const entry = (await JournalEntry.findOne({
    _id: params.id,
    userId,
  }).lean()) as JournalEntryApiGet

  if (!entry) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">Entry not found</h1>
    )
  }

  const plainEntry: JournalEntryApiGet = {
    ...entry,
    _id: entry._id.toString(),
    userId: entry.userId.toString(),
  }

  return (
    <div className="min-h-screen bg-red-400/50 p-4 sm:p-8 lg:p-12 flex justify-center items-center">
      <div className="w-full max-w-3xl">
        <EntryAddEditForm
          entry={plainEntry}
          text="Edit Entry"
          action={updateEntry.bind(null, params.id)}
        />
      </div>
    </div>
  )
}

export default EditEntryPage
