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
    try {
      await User.create({ clerkId, email })
      console.log("User created, email: ", email)
    } catch(e) {
      console.error("Error while creating user: ", e)
    }
  }
}

//@todo feature - make redirection, make loader and delete unnecessary html

const Onboarding = async () => { 
    await createNewUser()
    return <div className="w-screen h-screen bg-black flex justify-center items-center text-white bg-red-400/50">
    <div className="w-full max-w-[600px]">
      <h1 className="text-6xl mb-4 text-blue-900">Welcome to your wellbeing journal</h1>
      <p className="text-2xl mb-4">
        You have created an account successfully and now you can make your daily notes about reasons to feel gratitude or satisfaction. Focusing on these events and emotions will train your brain to feel this emotions more often and more intensely. It will lead to improvement of your wellbeing!</p>
      <div>
      </div>
    </div>
  </div>}

export default Onboarding