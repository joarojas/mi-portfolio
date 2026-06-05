// ============================================================
//  hooks/useContactForm.js
//  Maneja todo el estado y lógica del formulario de contacto.
//  Separado de App.jsx para que Contact.jsx sea autosuficiente.
// ============================================================
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE, EMAILJS_KEY } from "../constants/emailjs";

const INITIAL_FORM = { name: "", email: "", message: "" };

export function useContactForm() {
  const [formData,   setFormData]   = useState(INITIAL_FORM);
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name:  formData.name,
          from_email: formData.email,
          message:    formData.message,
        },
        EMAILJS_KEY
      );
      setFormStatus("sent");
      setFormData(INITIAL_FORM);
      setTimeout(() => setFormStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  return { formData, formStatus, handleChange, handleSubmit };
}
