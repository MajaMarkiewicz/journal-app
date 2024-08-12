export enum Category { 
    Gratitude = 'Gratitude',
    Satisfaction = 'Satisfaction',
    Safety = 'Safety',
    Connection = 'Connection',
    Journal = 'Journal',
}

export interface JournalEntryApiGet {  
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    title: string;  
    content?: string;  
    category: Category;  
    additionalCategory?: Category;
}  

export interface JournalEntryApiPost {
    title: string;
    content?: string;
    category: Category;
    additionalCategory?: Category;
}