import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

import treeRoutes from './routes/trees.js';
import personRoutes from './routes/persons.js';

app.use(bodyParser.json());
app.use(cors());
app.use('/trees', treeRoutes);
app.use('/persons', personRoutes);

app.use((req: any, res: any, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use((error: any, req: any, res: any, next: any) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

const port = 3000;

app.listen(port, () =>{
    console.log("Server listening")
})