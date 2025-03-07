import { useState } from "react";
import { toast } from "react-toastify";

/**
 * Hook personalizado para manejar la validación de contraseñas.
 * Proporciona lógica de validación, gestión de errores y estado para la contraseña.
 *
 * @returns {Object} - Un objeto con las propiedades y funciones relacionadas con la validación:
 * - `password` {string} El valor actual de la contraseña.
 * - `setPassword` {Function} Función para actualizar el estado de la contraseña.
 * - `ValidatePassword` {Function} Función para validar una contraseña específica.
 * - `validateAndHandleError` {Function} Valida la contraseña actual y maneja los errores.
 */
const usePasswordValidation = () => {
    // Estado local para la contraseña
    const [password, setPassword] = useState("");

    /**
     * Valida que una contraseña cumpla con los requisitos de longitud, mayúsculas y números.
     *
     * @param {string} password - La contraseña que será validada.
     * @returns {string|null} - Un mensaje de error si la contraseña no es válida, o `null` si es válida.
     */
    const ValidatePassword = (password) => {
        if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
        if (!/[A-Z]/.test(password)) return "La contraseña debe contener al menos una letra mayúscula.";
        if (!/[0-9]/.test(password)) return "La contraseña debe contener al menos un número.";
        return null;
    };

    /**
     * Valida la contraseña actual y maneja errores mostrando mensajes al usuario.
     *
     * @returns {boolean} - `true` si la contraseña es válida, `false` si no lo es.
     */
    const validateAndHandleError = () => {
        const validationError = ValidatePassword(password);
        if (validationError) {
            toast.error(validationError); 
            return false; 
        }
        return true; 
    };

    // Retorna el estado y las funciones relacionadas
    return { password, setPassword, ValidatePassword, validateAndHandleError };
};

export default usePasswordValidation;
