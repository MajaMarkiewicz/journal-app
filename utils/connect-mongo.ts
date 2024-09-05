import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI
let connected: Boolean = false

async function connectMongo() {
  if (!MONGO_URI) {
    throw new Error(
      'Please define the MONGO_URI environment variable inside .env.local',
    )
  }

  if (connected) {
    console.log('MongoDB is connected')
    return
  }

  try {
    await mongoose.connect(MONGO_URI)
    connected = true
    console.log('MongoDB is connected')
  } catch (e) {
    throw e
  }
}
export default connectMongo
