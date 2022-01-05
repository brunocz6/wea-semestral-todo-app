import { Express, Request, Response } from "express";
import { createUserSessionHandler, invalidateUserSessionHandler } from "./controller/session.controller";
import { createTodoHandler, deleteTodoHandler, editTodoHandler, getTodoHandler, getTodosHandler } from "./controller/todo.controller";
import { createUserHandler, getUserSessionsHandler } from "./controller/user.controller";
import { deserializeUser, requiresUser, validateRequest } from "./middleware";
import { createTodoSchema, deleteTodoSchema, editTodoSchema } from "./schema/todo.schema";
import { createUserSchema, createUserSessionSchema } from "./schema/user.schema";

export default function(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    // Register user
    app.post(
        "/api/users",
        validateRequest(createUserSchema),
        createUserHandler
    );

    // Login
    app.post(
        "/api/sessions",
        validateRequest(createUserSessionSchema),
        createUserSessionHandler
    );

    // Get the user's sessions
    app.get(
        "/api/sessions",
        requiresUser,
        getUserSessionsHandler
    );

    // Logout
    app.delete(
        "/api/sessions",
        requiresUser,
        invalidateUserSessionHandler
    );

    // Create TODO item
    app.post(
        "/api/todos",
        [requiresUser, validateRequest(createTodoSchema)],
        createTodoHandler
    );

    // Get TODO item
    app.get(
        "/api/todos/:todoId",
        requiresUser,
        getTodoHandler
    );

    // List TODO items for current user
    app.get(
        "/api/todos",
        [requiresUser],
        getTodosHandler
    );

    // Edit TODO item
    app.put(
        "/api/todos/:todoId",
        [requiresUser, validateRequest(editTodoSchema)],
        editTodoHandler
    );

    // Delete TODO item
    app.delete(
        "/api/todos/:todoId",
        [requiresUser, validateRequest(deleteTodoSchema)],
        deleteTodoHandler
    );
}