import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import { ErrorWithMessage } from "../interface/error.interface";
import User, { UserDocument } from "../model/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
    try {
        return await User.create(input);
    } catch (e) {
        const error = e as ErrorWithMessage;
        throw new Error(error.message);
    }
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query).lean();
}

export async function validatePassword(
{
    email,
    password
}: {
    email: UserDocument["email"],
    password: string
}) {
    const user = await User.findOne({ email });

    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(password);

    if(!isValid) {
        return false;
    }

    return omit(user.toJSON(), "password") as UserDocument;
}