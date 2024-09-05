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

  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        <EntryAddEditForm
          entry={entry}
          text="Edit entry"
          action={updateEntry.bind(null, params.id)}
        />
      </div>
    </div>
  )
}

export default EditEntryPage
