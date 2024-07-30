export const getJournalEntriesForAUser = async (userId: String) => {
    const res = await fetch('/api/journal', userId) // @todo how to pass userId to API? fetch czy get?
    const data = await res.json()
    return data // @todo order by desc by createdAt
}