import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Knowledge, { IKnowledge } from '../../../models/Knowledge';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const knowledge: IKnowledge | null = await Knowledge.findById(id);
      if (!knowledge) {
        return res.status(404).json({ error: 'Knowledge not found' });
      }
      res.status(200).json(knowledge);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch knowledge' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, definition, categories } = req.body;
      const updatedKnowledge = await Knowledge.findByIdAndUpdate(
        id,
        { title, definition, categories },
        { new: true, runValidators: true }
      );
      if (!updatedKnowledge) {
        return res.status(404).json({ error: 'Knowledge not found' });
      }
      res.status(200).json(updatedKnowledge);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update knowledge' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedKnowledge = await Knowledge.findByIdAndDelete(id);
      if (!deletedKnowledge) {
        return res.status(404).json({ error: 'Knowledge not found' });
      }
      res.status(200).json({ message: 'Knowledge deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete knowledge' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}