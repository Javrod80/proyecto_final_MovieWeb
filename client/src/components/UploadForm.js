import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
/**
 * Componente para subir imágenes al servidor.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {function(string):void} props.onImageUpload - Función que se ejecuta al subir una imagen exitosamente.
 * @returns {JSX.Element} Componente de formulario para subir imágenes.
 */
const UploadForm = ({ onImageUpload }) => {
    /**
     * Estado para almacenar la imagen seleccionada.
     * @type {[File|null, function]} 
     */
    const [image, setImage] = useState(null);
    /**
   * Estado para almacenar mensajes de éxito o error.
   * @type {[string, function]}
   */
    const [message, setMessage] = useState("");
    /**
     * Hook personalizado para manejar el estado de carga y errores.
     */
    const { isLoading, error } = useFetch();
    /**
    * Maneja el cambio de archivo en el input de tipo file.
    * 
    * @param {React.ChangeEvent<HTMLInputElement>} e - Evento del input de archivo.
    */

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        //  console.log("Archivo seleccionado:", e.target.files[0]);
    };
    /**
         * Maneja el envío del formulario para subir la imagen.
         * 
         * @param {React.FormEvent<HTMLFormElement>} e - Evento de envío del formulario.
         * @returns {Promise<void>}
         */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setMessage("Por favor, selecciona una imagen primero.");
            return;
        }
        /**
        * FormData para enviar la imagen al servidor.
        * @constant {FormData}
        */
        const formData = new FormData();
        formData.append("image", image);



        try {
            /**
           * Token de autenticación almacenado en localStorage.
           * @constant {string|null}
           */
            const token = localStorage.getItem('token');
            /**
           * Realiza la solicitud al servidor para subir la imagen.
           * @constant {Response}
           */
            const response = await fetch("http://localhost:5000/movieapp/v1/users/upload-files", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                setMessage(`Error al subir la imagen: ${errorResponse.message}`);
                return;
            }
            /**
            * Resultado de la respuesta del servidor.
            * @constant {Object}
            * @property {string} [imagePath] - Ruta de la imagen subida.
            */
            const result = await response.json();
            // console.log("Respuesta del servidor:", result);
            setMessage(`Imagen subida con éxito: ${result.imagePath || 'Ruta no disponible'}`);
            onImageUpload(result.imagePath);
        } catch (err) {
            console.error("Error al realizar la solicitud:", err);
            setMessage("Error al realizar la solicitud: " + err.message);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm p-3" style={{ width: "320px" }}>
                <h3 className="text-center mb-3">Subir Imagen</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-sm" disabled={isLoading}>
                            {isLoading ? "Subiendo..." : "Subir"}
                        </button>
                    </div>
                </form>
                {message && <div className="alert alert-info mt-2 p-2">{message}</div>}
                {error && <div className="alert alert-danger mt-2 p-2">Error: {error.message}</div>}
            </div>
        </div>
    );
};

export default UploadForm;
