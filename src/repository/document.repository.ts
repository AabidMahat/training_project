import { getRepository } from "typeorm";
import Document from "../models/document.model";

class DocumentRepository {
  async createDocument(document: Partial<Document>) {
    const newDocument = getRepository(Document).create(document);
    return await getRepository(Document).save(newDocument);
  }

  async getDocumentById(documentId: number) {
    return await getRepository(Document).findOne({
      where: {
        id: documentId,
      },
    });
  }

  async saveDocument(document: Document) {
    return await getRepository(Document).save(document);
  }
}

export default new DocumentRepository();
