import {Router, Request, Response} from 'express';
import {NextFunction} from 'connect';
import * as jwt from 'jsonwebtoken';
import * as AWS from '../../../../aws';
import * as c from '../../../../config/config';
import {CommentItem} from "../models/CommentItem";

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({message: 'No authorization headers.'});
  }

  const tokenBearer = req.headers.authorization.split(' ');
  if (tokenBearer.length != 2) {
    return res.status(401).send({message: 'Malformed token.'});
  }

  const token = tokenBearer[1];
  return jwt.verify(token, c.config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate.'});
    }
    return next();
  });
}

// Get all comment items
router.get('/:feedId', async (req: Request, res: Response) => {
    const feedId = req.params.feedId;
    const items = await CommentItem.findAndCountAll({
        where: {
            feedItemId: feedId
        },
        order: [['id', 'DESC']]
    });
    items.rows.map((item) => {
        if (item.url) {
            item.url = AWS.getGetSignedUrl(item.url);
        }
    });
    res.send(items);
});

// Get a comment resource
router.get('/:id',
    async (req: Request, res: Response) => {
      const {id} = req.params;
      const item = await CommentItem.findByPk(id);
      res.send(item);
    });

// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName',
    requireAuth,
    async (req: Request, res: Response) => {
      const {fileName} = req.params;
      const url = AWS.getPutSignedUrl(fileName);
      res.status(201).send({url: url});
    });

// Create comment with metadata
router.post('/',
    requireAuth,
    async (req: Request, res: Response) => {
      const content = req.body.content;
      const feedId = req.body.feedId;

      if (!content) {
        return res.status(400).send({message: 'Content is required or malformed.'});
      }

      if (!feedId) {
          return res.status(400).send({message: 'Feed ID is required or malformed.'});
      }

      const item = await new CommentItem({
        content: content,
          feedItemId: feedId
      });

      const savedItem = await item.save();

      savedItem.url = AWS.getGetSignedUrl(savedItem.url);
      res.status(201).send(savedItem);
    });

export const CommentRouter: Router = router;
