import { object, string, boolean, date } from "yup";

export const createTodoSchema = object({
    body: object({
        name: string()
            .required("Name is required")
            .max(100, "Name must be shorter than 100 chars."),
        description: string()
            .max(1000, "Description must be shorter than 1000 chars."),
        deadline: date()
    })
});

export const editTodoSchema = object({
    body: object({
        name: string()
            .required("Name is required")
            .max(100, "Name must be shorter than 100 chars."),
        description: string()
            .max(1000, "Description must be shorter than 1000 chars."),
        deadline: date(),
        finishedAt: date()
    })
});

export const deleteTodoSchema = object({
    params: object({
        todoId: string()
            .required("Id of TODO item is required")
    })
});