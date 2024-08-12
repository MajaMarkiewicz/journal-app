import connectMongo from "@/utils/connect-mongo"
import User from "@/models/User"
import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { redirect } from "next/navigation"

const createNewUser = async () => {
  await connectMongo(); // @todo delete after moving to lib folder && WHY CANNOT CONNECT?

  const user = await currentUser()
  if (!user) redirect ("/sign-in")
  
  const { id: clerkId, primaryEmailAddress } = user
  const isUserCreated = await User.exists({ clerkId }) // @todo hit api/user with GET or fn in lib folder
  if (!isUserCreated) {
    await User.create({ clerkId, email: primaryEmailAddress }) // @todo hit api/user with POST or fn in lib folder
  console.log("end of createNewUser", user)
  }
}

//@todo should I make api routes or should I resign from onboarding client page, make it a server component with loader and call db in lib without hitting API?
//@todo check if it works in db and delete logs and todos

const Onboarding = async () => { 
    await createNewUser()
    return <div className="w-screen h-screen bg-black flex justify-center items-center text-white bg-red-400/50">
    <div className="w-full max-w-[600px]">
      <h1 className="text-6xl mb-4 text-blue-900">Welcome to your wellbeing journal</h1>
      <p className="text-2xl mb-4">
        You have created an account successfully and now you can make your daily notes about reasons to feel gratitude or satisfaction. Focusing on these events and emotions will train your brain to feel this emotions more often and more intensely. It will lead to improvement of your wellbeing!</p>
      <div>
        <Link href="/journal">
          <button className="bg-blue-900 px-4 py-2 rounded-lg text-xl">Get started</button>
        </Link>
      </div>
    </div>
  </div>}

export default Onboarding