import Document from "../models/document.model";
import documentRepository from "../repository/document.repository";

class DocumentService {
  async createDocument(document: Partial<Document>) {
    return await documentRepository.createDocument(document);
  }
}

export default new DocumentService();
