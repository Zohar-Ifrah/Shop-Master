import { getCollection, toObjectId } from '../../services/db.service.mjs'
import logger from '../../services/logger.service.mjs'

const COLLECTION_NAME = 'user'

export const userService = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await getCollection(COLLECTION_NAME)
        var users = await collection.find(criteria).toArray()
        users = users.map(user => {
            delete user.password

            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const objectId = toObjectId(userId)
        const collection = await getCollection(COLLECTION_NAME)
        const user = await collection.findOne({ _id: objectId })

        return user
    } catch (err) {
        logger.error(`while finding user by id: ${userId}`, err)
        throw err
    }
}

async function getByUsername(username) {
    try {
        const collection = await getCollection(COLLECTION_NAME)
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user by username: ${username}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const objectId = toObjectId(userId)
        const collection = await getCollection(COLLECTION_NAME)
        await collection.deleteOne({ _id: objectId })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    try {
        const objectId = toObjectId(user._id)

        const userToSave = {
            _id: objectId,
            fullname: user.fullname,
        }
        const collection = await getCollection(COLLECTION_NAME)
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
        return userToSave
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user) {
    try {
        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            createdAt: Date.now(),
            // some demo data for first load 
            products: [
                {
                    "_id": "670af498ea71993ecf382593",
                    "name": "Carrot",
                    "sku": 1001,
                    "description": "Fresh and crunchy carrots, perfect for salads or cooking.",
                    "category": "Vegetable",
                    "marketingDate": 1727952000000,
                    "price": 2.5,
                    "imgUrl": "https://res.cloudinary.com/dqnsrtyxu/image/upload/v1728763898/Carrot_afhh8l.png"
                },
                {
                    "_id": "670af498ea71993ecf382595",
                    "name": "Potato",
                    "sku": 1003,
                    "description": "Red potatoes, excellent for cooking.",
                    "category": "Vegetable",
                    "marketingDate": 1727779200000,
                    "price": 1.2,
                    "imgUrl": "https://res.cloudinary.com/dqnsrtyxu/image/upload/v1728763905/Potato_epcfog.png"
                },
                {
                    "_id": "670af498ea71993ecf382596",
                    "name": "Tomato",
                    "sku": 1004,
                    "description": "Ripe tomatoes, ideal for salads and sauces.",
                    "category": "Vegetable",
                    "marketingDate": 1727692800000,
                    "price": 2.8,
                    "imgUrl": "https://res.cloudinary.com/dqnsrtyxu/image/upload/v1728763909/Tomato_wyvfep.png"
                },
                {
                    "_id": "670af498ea71993ecf382597",
                    "name": "Banana",
                    "sku": 1005,
                    "description": "Fresh bananas, a great source of energy.",
                    "category": "Fruit",
                    "marketingDate": 1727606400000,
                    "price": 1.5,
                    "imgUrl": "https://res.cloudinary.com/dqnsrtyxu/image/upload/v1728587555/bananas_tatxw8.png"
                },
                {
                    "_id": "670af498ea71993ecf382598",
                    "name": "Cucumber",
                    "sku": 1006,
                    "description": "Crisp cucumbers, perfect for refreshing salads.",
                    "category": "Vegetable",
                    "marketingDate": 1727520000000,
                    "price": 1.8,
                    "imgUrl": "https://res.cloudinary.com/dqnsrtyxu/image/upload/v1728763913/Cucumber_iirgav.png"
                }
            ],
        }
        const collection = await getCollection(COLLECTION_NAME)
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot add user', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    //2DO
    return criteria
}