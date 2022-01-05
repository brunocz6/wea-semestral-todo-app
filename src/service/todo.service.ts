import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Todo, { TodoDocument } from "../model/todo.model";

export function createTodo(input: DocumentDefinition<TodoDocument>) {
    return Todo.create(input);
}

export function findTodos(
    query: FilterQuery<TodoDocument>,
    options: QueryOptions = { lean: true }
) {
    return Todo.find(query, {}, options);
}

export function findTodo(
    query: FilterQuery<TodoDocument>,
    options: QueryOptions = { lean: true }
) {
    return Todo.findOne(query, {}, options);
}

export function findAndUpdateTodo(
    query: FilterQuery<TodoDocument>,
    update: UpdateQuery<TodoDocument>,
    options: QueryOptions
) {
    return Todo.findByIdAndUpdate(query, update, options);
}

export function deleteTodo(
    query: FilterQuery<TodoDocument>
) {
    return Todo.deleteOne(query);
}