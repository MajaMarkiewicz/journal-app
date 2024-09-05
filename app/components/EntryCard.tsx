import type { JournalEntryApiGet } from '@/types/journalEntry'

const EntryCard: React.FC<{ entry: JournalEntryApiGet }> = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString() // @todo style - choose date format
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5">
        <div>Main category: {entry.category}</div>
        {entry.additionalCategory ? (
          <span>Additional category: {entry.additionalCategory}</span>
        ) : null}
      </div>
      <strong className="px-4 py-5">{entry.title}</strong>
      <div className="px-4 py-5">{entry.content}</div>
    </div>
  )
}

export default EntryCard
