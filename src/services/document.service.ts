import { getRepository } from "typeorm";
import Document from "../models/document.model";
import documentRepository from "../repository/document.repository";
import workspaceRepository from "../repository/workspace.repository";
import workspaceUserRepository from "../repository/workspaceUser.repository";
import activityService from "./activity.service";

class DocumentService {
  async createDocument(document: Document, userId: number) {
    const documentData = (await getRepository(Document).findOne({
      where: {
        id: document.id,
      },
    })) as Document;
    await activityService.logDocumentActivity(
      "create-document",
      userId,
      documentData
    );

    return await documentRepository.createDocument(document);
  }

  async getDocumentById(documentId: number, userId: number) {
    const document = await documentRepository.getDocumentById(documentId);

    if (!document) {
      throw new Error("No document found");
    }

    const workspaceUser = await workspaceUserRepository.getWorkSpaceUserById(
      userId,
      document.workspace?.id
    );

    if (!workspaceUser) {
      throw new Error("Access denied : You are not part of this workspace");
    }

    return document;
  }
  async saveDocument(document: Document) {
    return await documentRepository.saveDocument(document);
  }

  async addDocumentToWorkspace(workspaceId: string, documentId: number) {
    console.log({
      workspaceId,
    });

    const document = await getRepository(Document).findOne({
      where: {
        id: documentId,
      },
    });

    const getWorkSpaceDocuments =
      (await documentRepository.getWorkspaceDocuments(workspaceId)) || [];

    console.log({ getWorkSpaceDocuments, document });

    const workspace = await workspaceRepository.getWorkspaceById(workspaceId);

    document!.workspace = workspace!;

    await documentRepository.saveDocument(document!);

    return document;
  }

  async deleteDocument(documentId: number, userId: number) {
    return await documentRepository.deleteDocument(documentId, userId);
  }

  async updateDocument(documentId: number, content: string, userId: number) {
    const document = (await getRepository(Document).findOne({
      where: {
        id: documentId,
      },
    })) as Document;

    await activityService.logDocumentActivity(
      "edit-document",
      userId,
      document
    );

    return await documentRepository.updateDocument(documentId, content);
  }

  async getOwnerDocuments(userId: number) {
    return await documentRepository.getOwnerDocuments(userId);
  }
}

export default new DocumentService();
