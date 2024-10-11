import { env } from "@/common/utils/envConfig";
import { app, logger } from "@/server";

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

const mysql = require("mysql");

const db = mysql.createConnection({
  host: "database-synchrohnize.c5usaiu2af5z.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "synchrohnize",
  password: "superofficehours", // this is not good that the password is here, how do we obscure it?
  database: "-",
})

db.connect((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("Database connected.");
})

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
