import express, { Express, Request, Response } from 'express';

// Express/http server
const app: Express = express();

// Apply wildcard CORS (use this only for dev proposes)
app.all('*', function(req, res, next) {
  const origin = req?.header('Origin')?.toLowerCase() || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    package: 'monorepo-example',
    version: '0.0.5'
  });
});

let count = 1;
app.get('/counter', (req: Request, res: Response) => {
  res.json({
    count: count++
  });
});

app.get('/time', (req: Request, res: Response) => {
  res.json({
    fullDate: new Date()
  });
});

app.get('/healthcheck', (req: Request, res: Response) => {
  res.json({
    status: 'ok'
  });
});

// Export for external usage
export { app };
