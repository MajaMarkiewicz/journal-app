export interface UserApiGet {  
    _id: string;
    clerkId: string;
    email: string;
    createdAt: Date,
    updatedAt: Date,
}  

export interface UserApiPost { 
    clerkId: string;
    email: string;
}