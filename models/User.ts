import { model, models, Schema } from 'mongoose';  
import { UserApiGet } from '@/types/user';

const UserSchema = new Schema<UserApiGet>({
    clerkId: String,
    email: { 
        type: String, 
        unique: true, // @TODO handle error when email not unique
        required: [true, 'Email is required']
    }
}, {
    timestamps: true
})

const User = models.User || model('User', UserSchema);  
export default User;