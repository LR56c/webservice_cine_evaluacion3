import {MongoClient, ServerApiVersion} from "mongodb";

const uri = "mongodb+srv://db4:vZ7alaNDySr2Kk9I@cluster0.ih2l3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

