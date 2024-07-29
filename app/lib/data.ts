import { getUserByClerkId } from "@/utils/auth"

export const getJournalEntries = async () => {
    const { id } = await getUserByClerkId()
    const res = await fetch('/api/journal', id) // @todo how to pass userId to API? fetch czy get?
    const data = await res.json()
    return data // @todo order by desc by createdAt
}