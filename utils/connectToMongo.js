// import { connect, connection } from "mongoose";
import mongoose, { connect, connection } from "mongoose";

mongoose.set("strictQuery", true);

const conn = {
  isConnected: false,
};
export default async function dbConnect() {
  if (conn.isConnected) return;
  const db = await connect(process.env.MONGO_URI);
  conn.isConnected = db.connections[0].readyState;
  console.log(db.connection.db.databaseName);
}

connection.on(" connected", () => {
  console.log("Mongodb is connected");
});

connection.on(" error", (err) => {
  console.log("Mongodb connection error");
  console.log(err);
});
