import { model, models, Schema } from 'mongoose';
import { JournalEntryApiGet, Category } from '@/types/journalEntry';

const JournalEntrySchema = new Schema<JournalEntryApiGet>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },  
    title: {
        type: String,  
        required: true,
    },          
    content: String,
    category: {
        type: String,
        enum: Object.values(Category),
        required: true,
    },   
    additionalCategory: {
        type: String,
        enum: Object.values(Category),
        required: false,
    },
},  {  timestamps: true, 
})

const JournalEntry = models.JournalEntry || model('JournalEntry', JournalEntrySchema)
export default JournalEntry
