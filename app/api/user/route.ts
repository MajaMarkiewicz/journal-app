import { HttpStatusCode } from 'axios'
import connectMongo from '@/utils/connect-mongo'
import User from '@/models/User'
import { UserApiPost } from '@/types/user'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    await connectMongo()
    const body: UserApiPost = await req.json()
    if (body.clerkId) {
      const user = await User.create(body)
      return NextResponse.json(
        { data: user, message: 'Your user has been created' },
        { status: HttpStatusCode.Created },
      )
    }
    return NextResponse.json(
      { message: 'Clerk Id is missing' },
      { status: HttpStatusCode.BadRequest },
    )
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest },
    )
  }
}
