'use client'

import { Category } from "@/types/journalEntry"
import { createNewEntry } from "@/utils/api"

const NewEntryCard = () => {
    const handleOnClick = async () => {
        // @todo feature - show form to create new entry
        const form = {tittle: 'New entry', content: 'Description', category: Category.Gratitude, additionalCategory: Category.Connection}
        await createNewEntry(form)
    }

    return <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
            <span className="text-3xl">New entry</span>
        </div>
    </div>
}

export default NewEntryCard