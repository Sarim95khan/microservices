import mongoose from 'mongoose';
import { userAgent } from 'next/server';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUser = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = async (values: Record<string, any>) => {
  const user = await new UserModel(values).save();
  return user.toObject();
};
export const deleteUserById = (id: string) =>
  UserModel.findByIdAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
