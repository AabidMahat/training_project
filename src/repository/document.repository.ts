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
        isActive: true,
      },
      relations: ["workspace"],
    });
  }

  async saveDocument(document: Document) {
    return await getRepository(Document).save(document);
  }

  async deleteDocument(documentId: number, userId: number) {
    return await getRepository(Document).update(
      {
        id: documentId,
        user: {
          id: userId,
        },
      },
      {
        isActive: false,
      }
    );
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
