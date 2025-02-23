import watchHistoryController from "../controllers/watchHistory.controller.js";
import watchHistoryModel from "../models/MySQLModels/watchHistory.models.js";

// Mock del modelo de historial de visualización
jest.mock('../models/MySQLModels/watchHistory.models.js', () => ({
    addWatchHistory: jest.fn(), // Mock de la función addWatchHistory
}));

/**
 * Describe el conjunto de pruebas para la función addWatchHistory.
 * Estas pruebas verifican el comportamiento de la función al agregar una película al historial de visualización.
 */
describe('addWatchHistory', () => {
    /**
     * Limpia todos los mocks antes de cada prueba.
     * Esto asegura que cada prueba comience con un estado limpio.
     */
    beforeEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Prueba que verifica que una película se agrega correctamente al historial.
     * Se simula una solicitud con todos los campos necesarios y se verifica que la respuesta sea correcta.
     */
    it('debe agregar una película al historial correctamente', async () => {
        // Simulación de la solicitud (req) con todos los campos necesarios
        const req = {
            body: {
                user_id: 1,
                movie_id: 101,
                title: 'Inception',
                poster: 'inception_poster.jpg',
            }
        };

        // Simulación de la respuesta (res) con funciones mockeadas
        const res = {
            json: jest.fn(), // Mock de la función json
            status: jest.fn().mockReturnThis(), // Mock de la función status que retorna this para encadenamiento
        };

        // Simulación del comportamiento del modelo: la función addWatchHistory resuelve con 1 (éxito)
        watchHistoryModel.addWatchHistory.mockResolvedValue(1);

        // Ejecutar la función del controlador
        await watchHistoryController.addWatchHistory(req, res);

        // Verificar que la respuesta JSON contiene el mensaje de éxito
        expect(res.json).toHaveBeenCalledWith({ message: 'Historial actualizado' });

        // Verificar que no se llamó a res.status con códigos de error
        expect(res.status).not.toHaveBeenCalledWith(400);
        expect(res.status).not.toHaveBeenCalledWith(500);
    });

    /**
     * Prueba que verifica que se devuelve un error si faltan parámetros en la solicitud.
     * Se simula una solicitud sin el campo "poster" y se verifica que se devuelva un error 400.
     */
    it('debe devolver un error si faltan parámetros', async () => {
        // Simulación de la solicitud (req) sin el campo "poster"
        const req = {
            body: {
                user_id: 1,
                movie_id: 101,
                title: 'Inception',
                // No se incluye el campo poster
            }
        };

        // Simulación de la respuesta (res) con funciones mockeadas
        const res = {
            json: jest.fn(), // Mock de la función json
            status: jest.fn().mockReturnThis(), // Mock de la función status que retorna this para encadenamiento
        };

        // Ejecutar la función del controlador
        await watchHistoryController.addWatchHistory(req, res);

        // Verificar que se llamó a res.status con el código 400
        expect(res.status).toHaveBeenCalledWith(400);

        // Verificar que la respuesta JSON contiene el mensaje de error
        expect(res.json).toHaveBeenCalledWith({ error: 'Todos los campos son obligatorios' });
    });

    /**
     * Prueba que verifica que se maneja correctamente un error de base de datos.
     * Se simula un error en la base de datos y se verifica que se devuelva un error 500.
     */
    it('debe manejar errores si la base de datos falla', async () => {
        // Simulación de la solicitud (req) con todos los campos necesarios
        const req = {
            body: {
                user_id: 1,
                movie_id: 101,
                title: 'Inception',
                poster: 'inception_poster.jpg',
            }
        };

        // Simulación de la respuesta (res) con funciones mockeadas
        const res = {
            json: jest.fn(), // Mock de la función json
            status: jest.fn().mockReturnThis(), // Mock de la función status que retorna this para encadenamiento
        };

        // Simulación de un error en la base de datos
        watchHistoryModel.addWatchHistory.mockRejectedValue(new Error('Error en la base de datos'));

        // Ejecutar la función del controlador
        await watchHistoryController.addWatchHistory(req, res);

        // Verificar que se llamó a res.status con el código 500
        expect(res.status).toHaveBeenCalledWith(500);

        // Verificar que la respuesta JSON contiene el mensaje de error
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al agregar al historial' });
    });
});