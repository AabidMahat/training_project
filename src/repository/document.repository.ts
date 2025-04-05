import { getRepository } from "typeorm";
import Document from "../models/document.model";

class DocumentRepository {
  async createDocument(document: Partial<Document>) {
    const newDocument = getRepository(Document).create(document);
    return await getRepository(Document).save(newDocument);
  }

  async getWorkspaceDocuments(workspaceId: string) {
    return await getRepository(Document).find({
      where: {
        workspace: {
          id: workspaceId,
        },
      },
    });
  }

  async getDocumentById(documentId: number) {
    return await getRepository(Document).findOne({
      where: {
        id: documentId,
      },
      relations: ["workspace"],
    });
  }

  async saveDocument(document: Document) {
    return await getRepository(Document).save(document);
  }

  async deleteDocument(documentId: number) {
    return await getRepository(Document).delete({
      id: documentId,
    });
  }

  async updateDocument(documentId: number, content: string) {
    return await getRepository(Document).update(
      { id: documentId },
      {
        content,
      }
    );
  }

  async getOwnerDocuments(userId: number) {
    return await getRepository(Document).find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}

export default new DocumentRepository();
