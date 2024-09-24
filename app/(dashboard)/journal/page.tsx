import EntryCard from '@/app/components/EntryCard'
import NewEntryCard from '@/app/components/NewEntryCard'
import Link from 'next/link'
import { getUserByClerkId } from '@/utils/auth'
import connectMongo from '@/utils/connect-mongo'
import JournalEntry from '@/models/JournalEntry'

const JournalPage = async () => {
  await connectMongo()

  const { _id: userId } = await getUserByClerkId()
  const entries = await JournalEntry.find({ userId })

  return (
    <div className="flex flex-col p-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-900 text-center">
        Your Wellbeing Journal
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
