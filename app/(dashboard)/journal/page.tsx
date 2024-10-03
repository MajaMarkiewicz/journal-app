import EntryCard from '@/app/components/EntryCard'
import NewEntryCard from '@/app/components/NewEntryCard'
import { getUserByClerkId } from '@/utils/auth'
import connectMongo from '@/utils/connect-mongo'
import JournalEntry from '@/models/JournalEntry'
import type { JournalEntryApiGet } from '@/types/journalEntry'

const JournalPage = async () => {
  await connectMongo()

  const user = await getUserByClerkId()
  const entries = await JournalEntry.find({ userId: user._id }).lean<
    JournalEntryApiGet[]
  >()

  const plainEntries = entries.map(
    (entry) =>
      ({
        ...entry,
        _id: entry._id.toString(),
        userId: entry.userId.toString(),
      }) as JournalEntryApiGet,
  )

  return (
    <div className="flex flex-col p-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-900 text-center">
        Your Wellbeing Journal
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <NewEntryCard />
        {plainEntries.map((entry) => (
          <EntryCard key={entry._id} entry={entry} />
        ))}
      </div>
    </div>
  )
}

export default JournalPage
