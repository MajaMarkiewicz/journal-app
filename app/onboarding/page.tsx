import Link from "next/link"

const Onboarding = () => { 
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