'use client'

import Link from "next/link"

const NewEntryCard = () => {
    return <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
        <Link href="journal/add" className="px-4 py-5 sm:p-6">
            <span className="text-3xl">New entry</span>
        </Link>
    </div>
}

export default NewEntryCard