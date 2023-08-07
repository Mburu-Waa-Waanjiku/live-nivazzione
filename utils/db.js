import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    } 
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}
function convertSizeToObj(sz) {
  sz._id = sz._id?.toString() || null;
  sz.createdAt = sz.createdAt?.toString() || null;
  sz.updatedAt = sz.updatedAt?.toString() || null;
  return sz;
}
function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.shopId = doc.shopId?.toString() || null;
  doc.sizes = doc.sizes?.map(convertSizeToObj) || null;
  doc.color = doc.color?.map(convertSizeToObj) || null;
  doc.favourites = doc.favourites?.map(convertSizeToObj) || null;
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
} 
function convertRevDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.user = doc.user?.toString()  || null;
  doc.updatedAt = doc.updatedAt.toString();
  doc.ratings = doc.ratings.toString();
  return doc;
}

const db = { connect, disconnect, convertDocToObj, convertRevDocToObj };
export default db;