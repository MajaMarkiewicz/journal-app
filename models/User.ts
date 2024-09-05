import { model, models, Schema } from 'mongoose';  
import type { UserApiPost } from '@/types/user';

const UserSchema = new Schema<UserApiPost>({
    clerkId: String,
    email: { 
        type: String, 
        unique: true,
        required: [true, 'Email is required']
    }
}, {
    timestamps: true
})

const User = models.User || model('User', UserSchema);  
export default User;