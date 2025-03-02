import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

export const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));

if (process.env.ALLOWED_DOMAIN_LIST) {
  const allowedDomains = process.env.ALLOWED_DOMAIN_LIST.split(' ');
  app.use(cors({ origin: allowedDomains }));
}

const port = process.env.PORT || 4000;

export const _server = app.listen(port, () => {
  console.log('Express Server started and listening on port', port);
});

export async function teardown() {
  console.log('Shutting down server...');
  _server.close();
}
