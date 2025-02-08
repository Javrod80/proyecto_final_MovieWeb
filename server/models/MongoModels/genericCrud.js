import { executeDbOperation } from './dbOperations.js';


// Función general para obtener datos desde cualquier colección con un filtro dado.
const getDataFromCollection = async (collectionName, filter) => {
    return executeDbOperation(collectionName, (collection) =>
        collection.find(filter).toArray()
    );
}

// Función general para insertar un documento en una colección
const insertIntoCollection = async (collectionName, data) => {
    return executeDbOperation(collectionName, (collection) =>
        collection.insertOne({ ...data, createdAt: new Date() }) 
    );
};


// Función general para eliminar un documento de una colección
const deleteFromCollection = async (collectionName, filter) => {
    return executeDbOperation(collectionName, (collection) =>
        collection.deleteOne(filter)
    );
};

// Función general para actualizar un documento en una colección
const updateInCollection = async (collectionName, filter, updateData) => {
    return executeDbOperation(collectionName, (collection) =>
        collection.updateOne(filter, { $set: updateData })
    );
};

    
export { getDataFromCollection, insertIntoCollection, deleteFromCollection, updateInCollection };

