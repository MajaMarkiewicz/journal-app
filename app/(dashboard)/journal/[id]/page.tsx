import TextEditor from "@/app/components/TextEditor";
import JournalEntry from "@/db/models/journalEntry";
import { Category } from "@/types/journalEntry";
import { getUserByClerkId } from "@/utils/auth";

// const getEntry = async (id) => {
//     const user = await getUserByClerkId()
//     const entry = await JournalEntry.findOne({id, userId: user.id}) // @todo which method finOne or findById or findUnique? // @todo make correct call to get entry with id and userId
//     return entry
// }

const EditEntryPage = async ({ params }) => {
    // const entry = await getEntry(params.id)
    const entry = {title: 'asad', content: 'asdasd',category: Category.Safety, id: params.id}
    return (
        <div>
            <TextEditor entry={entry} />
        </div>
    );
}

export default EditEntryPage;