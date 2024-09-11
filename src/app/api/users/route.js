import { User } from '@/models/User';
import { UserInfo } from '@/models/UserInfo';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { isAdmin } from "@/utils/isAdmin";

export async function POST(data) {
  mongoose.connect(process.env.MONGO_URL);
  const pass = data.password;
  if (!pass?.length || pass.length < 5) {
    throw new Error('Password must be at least 5 characters');
  }
  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  data.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create(data);
  return createdUser;
}

export async function PUT(data) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, name, image, ...otherUserInfo } = data;

  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    filter = { email };
  }

  const user = await User.findOne(filter);
  await User.updateOne(filter, { name, image });
  await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, { upsert: true });

}

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    if (await isAdmin()) {
      const users = await User.find();
      return new Response(JSON.stringify(users), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify([]), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}