import { object, string, ref } from "yup";

export const createUserSchema = object({
    body: object({
        name: string().required("Name is required"),
        password: string()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum.")
            .matches(/^[a-zA-A0-9_.-]*$/, "Password can only contain Latin letters."),
        passwordConfirmation: string().oneOf(
            [ref("password"), null],
            "Passwords must match"
        ),
        email: string()
            .email("Must be a valid e-mail.")
            .required("Email is required")
    })
});

export const createUserSessionSchema = object({
    body: object({
        password: string()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum")
            .matches(/^[a-zA-A0-9_.-]*$/, "Password can only contain Latin letters."),
        email: string()
            .required("Email is required")
            .email("Must be a valid email")
    }),
});