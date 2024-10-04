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
    query.category = Array.isArray(searchParams.category)
      ? { $in: searchParams.category }
      : searchParams.category
  }
  if (searchParams.importantEvent) {
    query.importantEvent = true
  }

  const entries = await JournalEntry.find(query).lean<JournalEntryApiGet[]>()

  const plainEntries = entries.map((entry) => ({
    ...entry,
    _id: entry._id.toString(),
    userId: entry.userId.toString(),
  }))

  return (
    <div className="flex flex-col p-6 space-y-8">
      <h2 className="text-4xl font-bold mb-8 text-blue-900 text-center">
        Your Wellbeing Journal
      </h2>

      <JournalFilters />

      {Object.keys(searchParams).length > 0 && (
        <h3
          data-testid="filters-applied-info"
          className="text-center bg-gray-100 text-blue-800 px-4 py-2 rounded-md shadow-sm space-y-1 flex flex-col lg:flex-row items-center justify-center"
        >
          <strong>Filters Applied:</strong>
          {searchParams.category && (
            <div className="ml-2 bg-blue-200 px-3 py-1 rounded-full">
              Category:{' '}
              {Array.isArray(searchParams.category)
                ? searchParams.category.join(', ')
                : searchParams.category}
            </div>
          )}
          {searchParams.startDate && (
            <div className="ml-2 bg-blue-200 px-3 py-1 rounded-full">
              Start Date: {searchParams.startDate}
            </div>
          )}
          {searchParams.endDate && (
            <div className="ml-2 bg-blue-200 px-3 py-1 rounded-full">
              End Date: {searchParams.endDate}
            </div>
          )}
          {searchParams.importantEvent && (
            <div className="ml-2 bg-blue-200 px-3 py-1 rounded-full">
              Important Events
            </div>
          )}
        </h3>
      )}

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
