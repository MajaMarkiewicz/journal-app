'use client'

import Link from 'next/link'
import { FaPlus } from 'react-icons/fa'

const NewEntryCard = () => {
  return (
    <div
      data-testid="add-entry"
      className="cursor-pointer rounded-lg bg-gray-50 shadow-lg p-4 sm:p-6 transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col items-center h-full"
    >
      <Link
        href="journal/add"
        className="flex flex-col items-center justify-center h-full"
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 text-white mb-2">
          <FaPlus className="text-2xl" />
        </div>
        <strong className="text-lg text-blue-900">New entry</strong>
      </Link>
    </div>
  )
}

export default NewEntryCard
