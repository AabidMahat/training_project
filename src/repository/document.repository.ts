import { getRepository } from "typeorm";
import Document from "../models/document.model";

class DocumentRepository {
  async createDocument(document: Partial<Document>) {
    const newDocument = getRepository(Document).create(document);
    return await getRepository(Document).save(newDocument);
  }
}

export default new DocumentRepository();
