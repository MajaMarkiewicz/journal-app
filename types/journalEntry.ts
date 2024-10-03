export enum Category {
  Gratitude = 'Gratitude',
  Satisfaction = 'Satisfaction',
  Safety = 'Safety',
  Connection = 'Connection',
  Journal = 'Journal',
}

export interface JournalEntryApiPost {
  title: string
  content?: string
  category: Category
  additionalCategory?: Category
  userId: string
  date: Date
  importantEvent: boolean
}

export type JournalEntryApiGet = JournalEntryApiPost & {
  _id: string
  createdAt: Date
  updatedAt: Date
}
