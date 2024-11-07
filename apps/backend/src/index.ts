import { env } from "@/common/utils/envConfig";
import { app, logger } from "@/server";
import { clerkClient, requireAuth } from '@clerk/express'

app.get('/protected', requireAuth({ signInUrl: '/sign-in' }), async (req, res) => {
  const { userId } = req.auth
  const user = await clerkClient.users.getUser(userId)
  return res.json({ user })
})

app.get('/sign-in', (req, res) => {
  // Assuming you have a template engine installed and are using a Clerk JavaScript SDK on this page
  res.render('sign-in')
})

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

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
