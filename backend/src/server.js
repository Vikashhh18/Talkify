import express from 'express';
import 'dotenv/config'
import authRouter from './Routes/auth.route.js';
import messageRouter from './Routes/message.route.js';

const app = express();

app.use("/api/auth",authRouter);
app.use("/api/message",messageRouter);

const port=process.env.PORT||3002;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
