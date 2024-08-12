import { model, models, Schema } from 'mongoose';
import { JournalEntryApiGet, Category } from '@/types/journalEntry';

const JournalEntrySchema = new Schema<JournalEntryApiGet>({
    userId: { // @TODO fix type mismatch
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

const JournalEntry = models.JournalEntry || model('JournalEntry', JournalEntrySchema);  
export default JournalEntry;

// Get all posts for a user:
// const userPosts = await JournalEntry.find({ userId: user._id });
// Get a specific post by id and userId:
// const post = await JournalEntry.findOne({ _id: postId, userId: user._id });
