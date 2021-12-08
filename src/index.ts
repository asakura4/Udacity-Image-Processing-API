import express from 'express';
import rs from './routes/resize';
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/../images/thumbnail'));

app.get('/api', (req, res): void => {
  //   console.log(__dirname);
  //   console.log(__dirname + '/../images/thumbnail');
  res.send('Hello, world!');
});

// resize endpoint
app.use('/resize', rs);

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
