import favoritesController from "../controllers/favorites.controller.js";
import { insertIntoCollection } from "../models/MongoModels/genericMongo.models.js";

jest.mock("../models/MongoModels/genericMongo.models.js", () => ({
    insertIntoCollection: jest.fn(),
}));

describe("Pruebas de insertFavorites", () => {
    const userId = "12345";
    const movieData = { title: "Inception", year: 2010 };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("debe insertar una película en la colección de favoritos", async () => {
        insertIntoCollection.mockResolvedValue({ acknowledged: true });

        // Simular el objeto req con el cuerpo esperado
        const req = {
            body: {
                userId,
                ...movieData,
            },
        };

        // Crear un mock para la respuesta
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await favoritesController.addFavorites(req, res);

        expect(insertIntoCollection).toHaveBeenCalledWith(
            "favorites",
            { userId, ...movieData }
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: "Película agregada a favoritos", result: { acknowledged: true } });
    });

    it("debe lanzar un error si la inserción falla", async () => {
        insertIntoCollection.mockRejectedValue(new Error("Error de base de datos"));

        // Simular el objeto req con el cuerpo esperado
        const req = {
            body: {
                userId,
                ...movieData,
            },
        };

        // Crear un mock para la respuesta
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await favoritesController.addFavorites(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Error al agregar la película a favoritos" });
    });
});
