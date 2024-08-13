import { JournalEntryApiPost } from "@/types/journalEntry"

const createURL = path => {
    return window.location.origin + path
}
// @todo db - do I need these functions
// @todo db - check if all db actions work

// @todo improvement - handle errors in all the utis/api functions below

export const createNewEntry = async (body: JournalEntryApiPost) => {
    const res = await fetch(new Request (createURL('/api/journal'), {
        method: 'POST',
        body: JSON.stringify(body),
    }))

    return await res.json()
}

export const updateJournalEntry = async (id: String, content) => {
    const res = await fetch(new Request(createURL(`/api/journal/${id}`), {
        method: 'PATCH',
        body: JSON.stringify(content),
    }))

    return await res.json()
}