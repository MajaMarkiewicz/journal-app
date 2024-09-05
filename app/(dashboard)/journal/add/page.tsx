import addEntry from "@/app/actions/addEntry";
import EntryAddEditForm from "@/app/components/EntryAddEditForm";

const AddEntryPage: React.FC = () => {
    return (
        <div className="h-full w-full grid grid-cols-3">
            <div className="col-span-2">
                <EntryAddEditForm
                    action={addEntry}
                    text='Add Post'
                />
            </div>
        </div>
    );
}

export default AddEntryPage
