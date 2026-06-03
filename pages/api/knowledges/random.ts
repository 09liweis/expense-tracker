import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Knowledge, { IKnowledge } from '../../../models/Knowledge';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const count = await Knowledge.countDocuments();
      if (count === 0) {
        return res.status(404).json({ error: 'No knowledges found' });
      }
      
      const randomIndex = Math.floor(Math.random() * count);
      const [randomKnowledge] = await Knowledge.find({}).skip(randomIndex).limit(1);
      
      res.status(200).json(randomKnowledge);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch random knowledge' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
