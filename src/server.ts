import express, { NextFunction, Request, Response } from 'express';
import next from 'next';

const port = parseInt(process.env.PORT || '3000', 10);

const createServer = async () => {
  const server = express();

  server.enable('trust proxy');
  server.disable('x-powered-by');

  const app = server.listen(port, () => {
    console.log(`Account service running on port ${port}`);
  });

  return { app, server };
};

const serverStart = () => {
  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev });
  const handle = app.getRequestHandler();
  
  app.prepare().then(async () => {
    const { server } = await createServer();
  
    server.all('*', (req, res) => handle(req, res));
  });
}

serverStart();