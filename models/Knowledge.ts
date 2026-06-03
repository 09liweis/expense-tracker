import mongoose from 'mongoose';

export interface IKnowledge {
  title: string;
  definition: string;
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
}

const KnowledgeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  definition: { type: String, required: true },
  categories: { type: [String], required: true },
}, {
  timestamps: true,
});

const Knowledge = (mongoose.models as any).Knowledge || (mongoose as any).model('Knowledge', KnowledgeSchema);

export default Knowledge;
