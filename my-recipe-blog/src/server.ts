import express from 'express';
import payload from 'payload';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

require('dotenv').config();
const app = express();

app.use(
  cors({
    origin: 'http://localhost:3001',
  })
);
app.use(bodyParser.json());

interface CustomRequest extends express.Request {
  user?: any;
}

const authenticateToken = (
  req: CustomRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers['authorization'];
  console.log('authHeader', authHeader);
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.PAYLOAD_SECRET as string,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
};

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET as string,
    express: app,
  });

  app.use(payload.authenticate);

  app.get('/api/recipes', authenticateToken, async (req, res) => {
    console.log('req.user', authenticateToken);
    const recipes = await payload.find({ collection: 'recipes' });
    res.json(recipes.docs);
  });

  app.get('/api/categories', authenticateToken, async (req, res) => {
    const categories = await payload.find({ collection: 'categories' });
    res.json(categories.docs);
  });

  app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('email', email);
    try {
      const userQuery = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (!userQuery.docs.length) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = userQuery.docs[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.PAYLOAD_SECRET as string
      );
      res.json({ user, token });
    } catch (error) {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

  app.listen(3000, () => {
    console.log('Payload CMS server is running on http://localhost:3000');
  });
};

start();
