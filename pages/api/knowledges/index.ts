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
      const knowledges: IKnowledge[] = await Knowledge.find({});
      res.status(200).json(knowledges);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch knowledges' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, definition, categories } = req.body;
      const knowledge = new Knowledge({ title, definition, categories });
      const savedKnowledge = await knowledge.save();
      res.status(201).json(savedKnowledge);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create knowledge' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}