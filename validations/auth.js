import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат электронного адреса (email)").isEmail(),
  body("password", "Пароль должен быть минимум 6 символов").isLength({
    min: 6,
  }),
  body("fullName", "Укажите корректное имя").isLength({ min: 3 }),
  body("avatarUrl", "Некорректная ссылка на аватар").optional().isURL(),
];

export const loginValidation = [
  body("email", "Неверный формат электронного адреса (email)").isEmail(),
  body("password", "Пароль должен быть минимум 6 символов").isLength({
    min: 6,
  }),
];
