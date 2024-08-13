import TextEditor from "@/app/components/TextEditor";
import JournalEntry from "@/models/JournalEntry";
import { getUserByClerkId } from "@/utils/auth";
import connectMongo from "@/utils/connect-mongo";

const EditEntryPage = async ({ params }) => {
    await connectMongo()

    const { _id: userId } = await getUserByClerkId()
    const entry = await JournalEntry.findOne({ _id: params.id, userId });

    return (
        <div className="h-full w-full grid grid-cols-3">
            <div className="col-span-2">
                <TextEditor entry={entry} />
            </div>
        </div>
    );
}

export default EditEntryPage;