// models/Document.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IDocument extends Document {
  docId: string;
  content: Buffer;
}

const DocumentSchema = new Schema({
  docId: { type: String, required: true, unique: true },
  content: { type: Buffer, required: true },
});

const DocumentModel = mongoose.model<IDocument>('Document', DocumentSchema);

export default DocumentModel;
export type { IDocument };
