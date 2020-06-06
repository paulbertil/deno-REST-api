// importing the deno_mongo
import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";

// Intialize the plugin
await init();

// Create client
const client = new MongoClient();
// Connect to mongodb
client.connectWithUri("mongodb://localhost:27017");

// Specifying the database name
const dbname: string = "Product_list_deno";
const db = client.database(dbname);

// Declare the collections here. Here we are using only one collection (i.e friends).
const Product = db.collection("products");

export { db, Product };
