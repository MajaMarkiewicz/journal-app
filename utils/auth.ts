import User from "@/models/User"
import { UserApiGet } from "@/types/user"
import { auth } from "@clerk/nextjs/server"

export const getUserByClerkId = async () => { //@todo db - should I use this fn in createNewUser instead of User.exists?
    const { userId } = await auth()
    const user: UserApiGet = await User.findOne({clerkId: userId}) // @todo db - throw error if not found
    return user
}