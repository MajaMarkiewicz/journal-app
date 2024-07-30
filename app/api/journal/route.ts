import connectMongo from "@/db/connect-mongo"
import JournalEntry from "@/db/models/journalEntry"
import { JournalEntryApiPost } from "@/types/journalEntry"
import { getUserByClerkId } from "@/utils/auth"
import { HttpStatusCode } from "axios"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {

    try {
        await connectMongo()
        const user = await getUserByClerkId()
        const body: JournalEntryApiPost  = await req.json()
        const entry = await JournalEntry.create({...body, userId: user.id});

        revalidatePath('/journal')

        return NextResponse.json({ data: entry }, { status: HttpStatusCode.Created })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest })
    }
}