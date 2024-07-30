import EntryCard from '@/app/components/EntryCard'
import NewEntryCard from '@/app/components/NewEntryCard'
// import { getJournalEntriesForAUser } from '@/utils/api'
// import { getUserByClerkId } from '@/utils/auth'

const JournalPage = async () => {
    const entries = []
    // const { id: userId } = await getUserByClerkId() // @todo uncomment when no error
    // const entries = await getJournalEntriesForAUser(userId) // @todo I should call db directly instead of hitting API

    return (
    <div className='p-10 bg-zinc-500/10'>
        <h2 className='text-3xl mb-8'>Journal</h2>
        <div className='grid grid-cols-3 gap-4 p-10'>
            <NewEntryCard />
            {entries.map(entry => <EntryCard key={entry.id} entry={entry} />)}
        </div>
    </div>
    )
}

export default JournalPage