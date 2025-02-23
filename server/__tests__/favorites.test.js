import favoritesController from "../controllers/favorites.controller.js";
import { insertIntoCollection } from "../models/MongoModels/genericMongo.models.js";

// Mock de la función insertIntoCollection para evitar llamadas reales a la base de datos
jest.mock("../models/MongoModels/genericMongo.models.js", () => ({
    insertIntoCollection: jest.fn(),
}));

/**
 * Conjunto de pruebas para la función addFavorites en el controlador de favoritos.
 */
describe("Pruebas de insertFavorites", () => {
    const userId = "12345";
    const movieData = { title: "Inception", year: 2010 };
    /**
         * Antes de cada prueba, limpiar los mocks para evitar interferencias entre pruebas.
         */
    beforeEach(() => {
        jest.clearAllMocks();
    });
    /**
       * Prueba que verifica si una película se inserta correctamente en la colección de favoritos.
       */
    it("debe insertar una película en la colección de favoritos", async () => {
        insertIntoCollection.mockResolvedValue({ acknowledged: true });

        // Simular el objeto req con el cuerpo esperado
        const req = {
            body: {
                userId,
                ...movieData,
            },
        };

        // Simulación del objeto res con funciones mockeadas
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await favoritesController.addFavorites(req, res);
        // Verificar que insertIntoCollection fue llamado con los parámetros correctos
        expect(insertIntoCollection).toHaveBeenCalledWith(
            "favorites",
            { userId, ...movieData }
        );
        // Verificar que la respuesta HTTP es 201 (creado)
        expect(res.status).toHaveBeenCalledWith(201);
        // Verificar que la respuesta JSON contiene el mensaje esperado
        expect(res.json).toHaveBeenCalledWith({ message: "Película agregada a favoritos", result: { acknowledged: true } });
    });
    /**
       * Prueba que verifica el manejo de errores si la inserción falla.
       */
    it("debe lanzar un error si la inserción falla", async () => {
        insertIntoCollection.mockRejectedValue(new Error("Error de base de datos"));

        // Simulación del objeto req con los datos esperados
        const req = {
            body: {
                userId,
                ...movieData,
            },
        };

        // Simulación del objeto res con funciones mockeadas
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await favoritesController.addFavorites(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Error al agregar la película a favoritos" });
    });
});
