import { JournalEntryApiPost } from "@/types/journalEntry"

const createURL = path => {
    return window.location.origin + path
}
// @todo handle error in all the utis/api functions below

export const createNewEntry = async (body: JournalEntryApiPost) => {
    const res = await fetch(new Request (createURL('/api/journal'), {
        method: 'POST',
        body: JSON.stringify(body),
    }))

    return await res.json()
}

export const getJournalEntriesForAUser = async (userId: String) => {
    const res = await fetch(new Request (createURL('/api/journal'), { // @todo how to pass userId to API?
        method: 'GET', // @todo is GET a default?
    }))

    return await res.json() // @todo order by desc by createdAt
}

export const updateJournalEntry = async (id: String, content) => {
    const res = await fetch(new Request(createURL(`/api/journal/${id}`), {
        method: 'PATCH',
        body: JSON.stringify(content),
    }))

    return await res.json()
}