'use client'

import Link from 'next/link'

const NewEntryCard = () => {
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow p-4 sm:p-6">
      <Link href="journal/add">
        <span className="text-xl sm:text-2xl">New entry</span>
      </Link>
    </div>
  )
}

export default NewEntryCard
