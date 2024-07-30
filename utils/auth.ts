import User from "@/db/models/user"
import { UserType } from "@/types/user"
import { auth } from "@clerk/nextjs/server"

// @todo should this fn be in utils or in lib/data? 

export const getUserByClerkId = async () => { //@todo should I use this fn in createNewUser instead of User.exists?
    const { userId } = await auth()
    const user: UserType = await User.findOne({clerkId: userId}) // @todo throw error if not found //@todo findOne or findUnique?
    return user
}