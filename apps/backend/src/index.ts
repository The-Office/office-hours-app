import { env } from "@/common/utils/envConfig";
import { app, logger } from "@/server";
import mysql from 'mysql2';

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});


const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD } = env;
const db = mysql.createConnection({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD
})

db.connect((err) => {
  console.log(`MYSQL HOST: ${MYSQL_HOST}`)
  console.log(`MYSQL PORT: ${MYSQL_PORT}`)
  console.log(`MYSQL USER: ${MYSQL_USER}`)
  console.log(`MYSQL PASSWORD: ${MYSQL_PASSWORD}`)
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
