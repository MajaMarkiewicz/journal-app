import type { JournalEntryApiGet } from '@/types/journalEntry'

const EntryCard: React.FC<{ entry: JournalEntryApiGet }> = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString() // @todo style - choose date format
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="px-4 py-2 text-sm text-gray-500">{date}</div>
      <div className="px-4 py-2">
        <div className="text-gray-700 text-sm">
          Main category: {entry.category}
        </div>
        {entry.additionalCategory && (
          <div className="text-gray-500 text-sm">
            Additional category: {entry.additionalCategory}
          </div>
        )}
      </div>
      <strong className="px-4 py-2 block text-lg">{entry.title}</strong>
      <div className="px-4 py-2 text-gray-600">{entry.content}</div>
    </div>
  )
}

export default EntryCard
