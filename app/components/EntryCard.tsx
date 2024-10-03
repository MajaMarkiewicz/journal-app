'use client'
import type { JournalEntryApiGet } from '@/types/journalEntry'
import deleteEntry from '@/app/actions/deleteEntry'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

const EntryCard: React.FC<{ entry: JournalEntryApiGet }> = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    startTransition(async () => {
      await deleteEntry(entry._id)
      router.refresh()
    })
  }

  const handleCardClick = () => {
    router.push(`/journal/${entry._id}`)
  }

  return (
    <div
      className="flex flex-col divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg h-full cursor-pointer"
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleCardClick()
        }
      }}
    >
      <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-500 h-12">
        <div className="flex flex-col">
          <strong className="text-gray-700 text-sm">{entry.category}</strong>
          {entry.additionalCategory && (
            <div className="text-gray-500 text-sm">
              {entry.additionalCategory}
            </div>
          )}
        </div>
        <div className="flex-shrink-0">{date}</div>
      </div>
      <strong className="px-4 py-2 block text-lg text-blue-900">
        {entry.title}
      </strong>
      <div className="px-4 py-2 text-gray-600 flex-grow flex">
        <p className="line-clamp-5 overflow-hidden flex-grow">
          {entry.content}
        </p>
      </div>
      <div className="px-4 py-2 flex justify-end space-x-2">
        <button
          type="button"
          data-testid="edit-button"
          onClick={handleCardClick}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          type="button"
          data-testid="delete-button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          disabled={isPending}
        >
          {isPending ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

export default EntryCard
