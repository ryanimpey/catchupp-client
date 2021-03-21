import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required()
        .lowercase(),
    password: Yup.string().required(),
});

export const accountSchema = Yup.object().shape({
    username: Yup.string().required(),
    displayName: Yup.string().required(),
    description: Yup.string().max(1000),
    avatar: Yup.string(),
    locale: Yup.object({
        countryCode: Yup.string()
            .min(2)
            .max(2)
            .uppercase(),
        city: Yup.string()
            .min(2)
            .max(100),
    }),
    notifications: Yup.object({
        newsletter: Yup.boolean(),
        marketing: Yup.boolean(),
        messagesToEmail: Yup.boolean(),
        messagesToSms: Yup.boolean(),
        messagesToDesktop: Yup.boolean(),
    }),
    application: Yup.object({
        email: Yup.string(),
        facebook: Yup.string(),
        instagram: Yup.string(),
        name: Yup.string(),
        other: Yup.string(),
        phone: Yup.string(),
        reason: Yup.string(),
        youtube: Yup.string(),
    }),
});
