import watchHistoryController from "../controllers/watchHistory.controller.js";
import watchHistoryModel from "../models/MySQLModels/watchHistory.models.js";

jest.mock('../models/MySQLModels/watchHistory.models.js', () => ({
    addWatchHistory: jest.fn(),
}));

describe('addWatchHistory', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar mocks antes de cada prueba
    });

    it('debe agregar una película al historial correctamente', async () => {
        const req = {
            body: {
                user_id: 1,
                movie_id: 101,
                title: 'Inception',
                poster: 'inception_poster.jpg',
            }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        // Simulación el comportamiento del modelo
        watchHistoryModel.addWatchHistory.mockResolvedValue(1);  
        await watchHistoryController.addWatchHistory(req, res);

        expect(res.json).toHaveBeenCalledWith({ message: 'Historial actualizado' });
        expect(res.status).not.toHaveBeenCalledWith(400);
        expect(res.status).not.toHaveBeenCalledWith(500);
    });

    it('debe devolver un error si faltan parámetros', async () => {
        const req = {
            body: {
                user_id: 1,
                movie_id: 101,
                title: 'Inception',
                // No se incluye el campo poster
            }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await watchHistoryController.addWatchHistory(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Todos los campos son obligatorios' });
    });

    it('debe manejar errores si la base de datos falla', async () => {
        const req = {
            body: {
                user_id: 1,
                movie_id: 101,
                title: 'Inception',
                poster: 'inception_poster.jpg',
            }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        // Simulación un error en la base de datos
        watchHistoryModel.addWatchHistory.mockRejectedValue(new Error('Error en la base de datos'));

        await watchHistoryController.addWatchHistory(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al agregar al historial' });
    });
});
