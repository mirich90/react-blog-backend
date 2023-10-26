import { body } from "express-validator";

export const postCreateValidation = [
  body("title", "Введите заголовок статьи")
    .isLength({
      min: 3,
    })
    .isString(),
  body("text", "Введите текст статьи")
    .isLength({
      min: 20,
    })
    .isString(),
  body("tags", "Неверный формат тегов (укажите массив)").optional().isArray(),
  body("imageUrl", "Некорректная ссылка на изображение").optional().isString(),
];
