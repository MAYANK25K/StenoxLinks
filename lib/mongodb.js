// lib/mongodb.js
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
// Removed the deprecated 'options' object completely for cleaner code

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') { 
  if (!global._mongoClientPromise) {
    // Note: removed 'options' from the MongoClient call here
    client = new MongoClient(uri) 
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // Note: removed 'options' from the MongoClient call here
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise