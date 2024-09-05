import EntryCard from '@/app/components/EntryCard'
import NewEntryCard from '@/app/components/NewEntryCard'
import Link from 'next/link'
import { getUserByClerkId } from '@/utils/auth'
import connectMongo from '@/utils/connect-mongo'
import JournalEntry from '@/models/JournalEntry'

const JournalPage = async () => {
    await connectMongo()

    const { _id: userId } = await getUserByClerkId()
    const entries = await JournalEntry.find({ userId })

    return (
    <div className='p-10 bg-zinc-500/10'>
        <h2 className='text-3xl mb-8'>Journal</h2>
        <div className='grid grid-cols-3 gap-4 p-10'>
            <NewEntryCard />
            {// @todo feature - decide if editing and adding an entry should be in the new page or in the modal 
            }
            {entries.map(entry => 
                <Link key={entry.id} href={`/journal/${entry.id}`}>
                    <EntryCard entry={entry} />
                </Link>)
                } 
        </div>
    </div>
    )
}

export default JournalPage