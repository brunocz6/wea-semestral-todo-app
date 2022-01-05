import { Request, Response } from "express";
import { get } from "lodash";
import { createTodo, deleteTodo, findAndUpdateTodo, findTodo, findTodos } from "../service/todo.service";

export async function createTodoHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const body = req.body;

    const todo = await createTodo({ ...body, user: userId });

    return res.send(todo);
}

export async function getTodoHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const todoId = get(req, "params.todoId");

    const todo = await findTodo({ todoId });

    // Returns 404 if todo item is not found or it doesn't belong to currently logged in user.
    // It's better to return 404 (NotFound) instead of 403 (Forbidden) or 401 (Unauthorized), because of security reasons.
    if (!todo || String(todo.user) !== userId) {
        return res.sendStatus(404);
    }

    return res.send(todo);
}

export async function getTodosHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");

    const todos = await findTodos({ user: userId });

    return res.send(todos);
}

export async function editTodoHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const todoId = get(req, "params.todoId");
    const edit = req.body;

    const identifier = {
        _id: todoId,
        user: userId
    };

    // Finds todo item record in DB.
    const todo = await findTodo(identifier);

    // Returns 404 if todo item is not found or it doesn't belong to currently logged in user.
    // It's better to return 404 (NotFound) instead of 403 (Forbidden) or 401 (Unauthorized), because of security reasons.
    if (!todo || String(todo.user) !== userId) {
        return res.sendStatus(404);
    }

    // Pokud není specifikované datum dokončení, nastavím ho na null.
    if (!edit.hasOwnProperty("finishedAt")) {
        edit.finishedAt = null;
    }

    // Performs update in DB.
    const updatedTodo = await findAndUpdateTodo(identifier, edit, { new: true })

    return res.send(updatedTodo);
}

export async function deleteTodoHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const todoId = get(req, "params.todoId");

    const identifier = {
        _id: todoId,
        user: userId
    };

    const todo = await findTodo(identifier);

    // Returns 404 if todo item is not found or it doesn't belong to currently logged in user.
    // It's better to return 404 (NotFound) instead of 403 (Forbidden) or 401 (Unauthorized), because of security reasons.
    if (!todo || String(todo.user) !== userId) {
        return res.sendStatus(404);
    }

    await deleteTodo(identifier);

    return res.sendStatus(200);
}