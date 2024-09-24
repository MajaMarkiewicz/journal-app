import addEntry from '@/app/actions/addEntry'
import EntryAddEditForm from '@/app/components/EntryAddEditForm'

const AddEntryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-red-400/50 p-4 sm:p-8 lg:p-12 flex justify-center items-center">
      <div className="w-full max-w-3xl">
        <EntryAddEditForm action={addEntry} text="Add Post" />
      </div>
    </div>
  )
}

export default AddEntryPage
