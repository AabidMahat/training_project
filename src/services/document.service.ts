import Document from "../models/document.model";
import documentRepository from "../repository/document.repository";

class DocumentService {
  async createDocument(document: Partial<Document>) {
    return await documentRepository.createDocument(document);
  }

  async getDocumentById(documentId: number) {
    return await documentRepository.getDocumentById(documentId);
  }
  async saveDocument(document: Document) {
    return await documentRepository.saveDocument(document);
  }
}

export default new DocumentService();
