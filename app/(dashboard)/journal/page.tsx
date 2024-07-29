import EntryCard from '@/app/components/EntryCard'
import NewEntryCard from '@/app/components/NewEntryCard'
import { getJournalEntries } from '@/app/lib/data'

const JournalPage = async () => {
    const entries = []
    // const entries = await getJournalEntries()
    return (
        <div className='grid grid-cols-3 gap-4 p-10'>
            <NewEntryCard />
            {entries.map(entry => <EntryCard key={entry.id} entry={entry} />)}
        </div>
    )
}

export default JournalPage