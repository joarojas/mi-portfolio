// src/utils/helpers.js
export const tx = (field, lang) => {
  if (!field) return "";
  if (typeof field === "object" && (field.es || field.en)) return field[lang] || field.es || "";
  return field;
};