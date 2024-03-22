import { MongoClient } from 'mongodb'

// Connection URL
const URI =
  'mongodb+srv://user2024:test123@cluster0.bwc1ymj.mongodb.net/?retryWrites=true&w=majority'

// Database Name
const dbName = 'test'

MongoClient.connect(URI, function (err, client) {
  console.log('Connected successfully to server')

  const db = client.db(dbName)

  let thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  db.getCollection('busmessages')
    .aggregate([
      { $sort: { businessId: 1, createdAt: -1 } },
      { $group: { _id: '$businessId', lastMessage: { $first: '$$ROOT' } } },
      { $match: { 'lastMessage.createdAt': { $lt: thirtyDaysAgo } } },
    ])
    .toArray(function (err, docs) {
      console.log(docs)
      client.close()
    })
})
