import mongo from '../database/mongo.connection.js'

const client = await mongo.connectToMongo()
const close = await mongo.closeClient()

const mydb = 'moviesweb'

export default {

   
    getDetails: async (req, res) => {

        try {
            const db = client.db(mydb)
            const collection = db.collection('DetailsMovies')
            const result = await collection.find({}).toArray()

            res.json(result)

        } finally {
            close()

        }
    }
}
