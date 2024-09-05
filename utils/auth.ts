import User from "@/models/User"
import type { UserApiGet } from "@/types/user"
import { auth } from "@clerk/nextjs/server"

export const getUserByClerkId = async () => {
    const { userId } = await auth()
    const user: UserApiGet | null = await User.findOne({clerkId: userId})
    if (!user) throw new Error("User not found")
    return user
}