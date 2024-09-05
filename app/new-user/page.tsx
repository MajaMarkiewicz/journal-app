import connectMongo from "@/utils/connect-mongo"
import User from "@/models/User"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const createNewUser = async () => {
  await connectMongo();

  const user = await currentUser()
  if (!user) redirect ("/sign-in")
  
  const { id: clerkId } = user
  const email = user.emailAddresses[0].emailAddress
  const isUserCreated = await User.exists({ clerkId })

  if (!isUserCreated) {
    await User.create({ clerkId, email })
    redirect("/journal")
  }
}

const newUser = async () => { 
    await createNewUser()
    return <div>...loading</div>
}

export default newUser