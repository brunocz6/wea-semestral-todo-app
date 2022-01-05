import mongoose from "mongoose";
import { UserDocument } from "./user.model"

export interface TodoDocument extends mongoose.Document {
    user: UserDocument["_id"];
    name: string;
    description: string | undefined;
    createdAt: Date;
    updatedAt: Date;
    finishedAt: Date | undefined;
    deadline: Date | undefined;
}

const TodoSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, default: "", required: true },
        description: { type: String, default: "", required: false },
        finishedAt: { type: Date , default: undefined, required: false },
        deadline: { type: Date , default: undefined, required: false },
    },
    { timestamps: true }
);

const Todo = mongoose.model<TodoDocument>("Todo", TodoSchema);

export default Todo;