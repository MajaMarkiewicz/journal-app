import EntryCard from '@/app/components/EntryCard'
import NewEntryCard from '@/app/components/NewEntryCard'
import JournalFilters from '@/app/components/JournalFilters'
import { getUserByClerkId } from '@/utils/auth'
import connectMongo from '@/utils/connect-mongo'
import JournalEntry from '@/models/JournalEntry'
import type { JournalEntryApiGet, Category } from '@/types/journalEntry'

interface FilterParams {
  startDate?: string
  endDate?: string
  category?: Category | Category[]
  importantEvent?: boolean
}

const JournalPage = async ({
  searchParams,
}: {
  searchParams: FilterParams
}) => {
  await connectMongo()

  const user = await getUserByClerkId()

  const query: any = {
    userId: user._id,
  }

  if (searchParams.startDate) {
    query.date = { ...query.date, $gte: new Date(searchParams.startDate) }
  }
  if (searchParams.endDate) {
    query.date = { ...query.date, $lte: new Date(searchParams.endDate) }
  }
  if (searchParams.category) {
    if (Array.isArray(searchParams.category)) {
      query.category = { $in: searchParams.category }
    } else {
      query.category = searchParams.category
    }
  }
  if (searchParams.importantEvent) {
    query.importantEvent = true
  }

  const entries = await JournalEntry.find(query).lean<JournalEntryApiGet[]>()

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

      <JournalFilters />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <NewEntryCard />
        {plainEntries
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
      </div>
    </div>
  )
}

export default JournalPage
