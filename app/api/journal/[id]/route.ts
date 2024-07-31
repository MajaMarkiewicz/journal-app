import { NextResponse } from 'next/server';
import JournalEntry from "@/db/models/journalEntry"
import { getUserByClerkId } from "@/utils/auth"

export const PATCH = async (request, { params }) => {
    const content = await request.json()
    const user = await getUserByClerkId()
    const updatedEntry = await JournalEntry.updateOne({id: params.id, userId: user.id}, content)

    return NextResponse.json({data: updatedEntry})
}