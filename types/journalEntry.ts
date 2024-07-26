export enum Category { 
    Gratitude = 'Gratitude',
    Satisfaction = 'Satisfaction',
    Safety = 'Safety',
    Connection = 'Connection',
    Journal = 'Journal',
}

export interface JournalEntryType {  
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    tittle: string;  
    content: string;  
    category: Category;  
    additionalCategory: Category;
}  

export interface JournalEntryApiPost {
    userId: string;
    tittle: string;
    content: string;
    category: Category;
    additionalCategory: Category;
}