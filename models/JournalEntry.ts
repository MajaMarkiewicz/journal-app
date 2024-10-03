import { model, models, Schema, type Types } from 'mongoose'
import { type JournalEntryApiGet, Category } from '@/types/journalEntry'

const JournalEntrySchema = new Schema<
  Omit<JournalEntryApiGet, 'userId'> & { userId: Types.ObjectId }
>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
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
      default: undefined,
    },
  },
  { timestamps: true },
)

const JournalEntry =
  models.JournalEntry || model('JournalEntry', JournalEntrySchema)
  
export default JournalEntry
