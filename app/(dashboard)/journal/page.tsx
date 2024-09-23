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
    <div className="min-h-screen flex flex-col bg-zinc-500/10 p-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Journal</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
