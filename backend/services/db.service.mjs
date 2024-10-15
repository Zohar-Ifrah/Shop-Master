import dotenv from 'dotenv'
import { MongoClient, ObjectId } from 'mongodb'

export const dbService = {
    getCollection,
    toObjectId
}

dotenv.config()

const url = process.env.MONGO_URI
const dbName = process.env.DB_NAME

let dbConn = null

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        dbConn = db
        console.log('DB connected!')
        return db
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err
    }
}

export async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName)
}

export function toObjectId(id) {
    try {
        return new ObjectId(id)
    } catch (err) {
        console.error('Invalid ObjectId format:', id, err)
        throw err
    }
}
