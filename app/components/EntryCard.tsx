import type { JournalEntryApiGet } from '@/types/journalEntry'

const EntryCard: React.FC<{ entry: JournalEntryApiGet }> = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()

  return (
    <div className="flex flex-col divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg h-full">
      <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-500 h-12">
        <div className="flex flex-col">
          <strong className="text-gray-700 text-sm">
            {entry.category}
          </strong>
          {entry.additionalCategory && (
            <div className="text-gray-500 text-sm">
              {entry.additionalCategory}
            </div>
          )}
        </div>
        <div className="flex-shrink-0">{date}</div>
      </div>
      <strong className="px-4 py-2 block text-lg text-blue-900">{entry.title}</strong>
      <div className="px-4 py-2 text-gray-600 flex-grow flex">
        <p className="line-clamp-5 overflow-hidden flex-grow">{entry.content}</p>
      </div>
    </div>
  )
}

export default EntryCard
