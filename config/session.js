const expressSession = require("express-session");
const mongoDbStoreFactory = require("connect-mongodb-session");

function createSessionStore() {
  const MongoDBStore = mongoDbStoreFactory(expressSession);

  const store = new MongoDBStore({
    uri: "mongodb://127.0.0.1:27017/online-shop",
    collection: "sessions",
  });

  store.on("error", (error) => {
    console.error("Session store error:", error);
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: "my secret key",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  };
}

module.exports = createSessionConfig;
