export interface UserApiGet {  
    id: string;
    clerkId: string;
    email: string;
    createdAt: Date,
    updatedAt: Date,
}  

export interface UserApiPost { 
    clerkId: string;
    email: string;
}