// ============================================================
//  utils/tx.js
//  Helper que lee un campo que puede ser string o {es, en}
//
//  Uso:
//    tx("hola", "es")           → "hola"
//    tx({es:"hola", en:"hi"}, "en") → "hi"
// ============================================================
export const tx = (field, lang) => {
  if (!field) return "";
  if (typeof field === "object" && (field.es || field.en)) {
    return field[lang] || field.es || "";
  }
  return field;
};
