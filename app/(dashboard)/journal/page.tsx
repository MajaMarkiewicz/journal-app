import EntryCard from '@/app/components/EntryCard'
import NewEntryCard from '@/app/components/NewEntryCard'
import Link from 'next/link'
// import { getJournalEntriesForAUser } from '@/utils/api'
// import { getUserByClerkId } from '@/utils/auth'

const JournalPage = async () => {
    const entries = [{title: 'title', description: 'description', category: 'Gratitude', additionalCategory: 'Connection', createdAt: 1722332919818, id: 'id'}] // @todo remove this line
    // const { id: userId } = await getUserByClerkId() // @todo uncomment when no error
    // const entries = await getJournalEntriesForAUser(userId) // @todo I should call db directly instead of hitting API

    return (
    <div className='p-10 bg-zinc-500/10'>
        <h2 className='text-3xl mb-8'>Journal</h2>
        <div className='grid grid-cols-3 gap-4 p-10'>
            <NewEntryCard />
            {// @todo decide if editing and adding an entry should be in the new page or in the modal 
            }
            {entries.map(entry => 
                <Link href={`/journal/${entry.id}`}>
                    <EntryCard key={entry.id} entry={entry} />
                </Link>)
                } 
        </div>
    </div>
    )
}

export default JournalPage