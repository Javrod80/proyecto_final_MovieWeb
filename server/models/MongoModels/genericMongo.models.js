import { executeDbOperation } from './mongo.models.js';

/**
 * Función general para obtener datos desde cualquier colección con un filtro dado.
 * @async
 * @function getDataFromCollection
 * @param {string} collectionName - El nombre de la colección en la base de datos.
 * @param {Object} filter - El filtro que se aplicará a la consulta.
 * @returns {Promise<Array>} Devuelve una promesa que contiene un arreglo con los documentos encontrados.
 */
// Función general para obtener datos desde cualquier colección con un filtro dado.
const getDataFromCollection = async (collectionName, filter) => {
    return executeDbOperation(collectionName, (collection) =>
        collection.find(filter).toArray()
    );
}
/**
 * Función general para insertar un documento en una colección.
 * @async
 * @function insertIntoCollection
 * @param {string} collectionName - El nombre de la colección en la base de datos.
 * @param {Object} data - Los datos del documento a insertar.
 * @returns {Promise<Object>} Devuelve una promesa que contiene el resultado de la operación de inserción.
 */

// Función general para insertar un documento en una colección
const insertIntoCollection = async (collectionName, data) => {
    return executeDbOperation(collectionName, (collection) =>
        collection.insertOne({ ...data, createdAt: new Date() }) 
    );
};
/**
 * Función general para eliminar un documento de una colección.
 * @async
 * @function deleteFromCollection
 * @param {string} collectionName - El nombre de la colección en la base de datos.
 * @param {Object} filter - El filtro que se aplicará para encontrar el documento a eliminar.
 * @returns {Promise<Object>} Devuelve una promesa que contiene el resultado de la operación de eliminación.
 */

// Función general para eliminar un documento de una colección
const deleteFromCollection = async (collectionName, filter) => {
    return executeDbOperation(collectionName, (collection) =>
        collection.deleteOne(filter)
    );
};
/**
 * Función general para actualizar un documento en una colección.
 * @async
 * @function updateInCollection
 * @param {string} collectionName - El nombre de la colección en la base de datos.
 * @param {Object} filter - El filtro que se aplicará para encontrar el documento a actualizar.
 * @param {Object} updateData - Los nuevos datos con los que se actualizará el documento.
 * @returns {Promise<Object>} Devuelve una promesa que contiene el resultado de la operación de actualización.
 */
// Función general para actualizar un documento en una colección
const updateInCollection = async (collectionName, filter, updateData) => {
    return executeDbOperation(collectionName, (collection) =>
        collection.updateOne(filter, { $set: updateData })
    );
};

    
export { getDataFromCollection, insertIntoCollection, deleteFromCollection, updateInCollection };

