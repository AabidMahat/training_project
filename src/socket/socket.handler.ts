import { Server, Socket } from "socket.io";
import documentService from "../services/document.service";
import activityService from "../services/activity.service";

const activatedUser: {
  [documentId: string]: Set<string>;
} = {};

export const configureSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("⚡User connected :" + socket.id);

    //   ! User joins the document

    socket.on(
      "joinWorkspace",
      async (data: { workspaceId: string; userId: string }) => {
        const { workspaceId, userId } = data;
        socket.join(workspaceId);

        // console.log("Received workspaceId:", workspaceId);
        // console.log("Received userId:", userId);

        console.log(`User ${userId} joined document ${workspaceId}`);

        //   ! Add user to the activatedUser Set

        if (!activatedUser[workspaceId]) {
          activatedUser[workspaceId] = new Set();
        }
        activatedUser[workspaceId].add(userId);

        //   ? Send list to all active user

        io.to(workspaceId).emit(
          "updateUserList",
          Array.from(activatedUser[workspaceId])
        );
      }
    );

    socket.on("typingUpdate", async ({ documentId, content, userId }) => {
      // Do NOT save to DB
      console.log(`📝 User ${userId} is typing in document ${documentId}`);

      // Broadcast content to others in real time
      socket.to(documentId).emit("liveTyping", content);
    });

    socket.on("saveDocument", async ({ documentId, content, userId }) => {
      console.log(`💾 User ${userId} is saving document ${documentId}`);
      const document = await documentService.getDocumentById(
        +documentId,
        +userId
      );
      if (document) {
        document.content = content;
        await documentService.saveDocument(document);
        await activityService.logDocumentActivity(
          "save-Document",
          +userId,
          document
        );
      }
    });

    socket.on("joinDocument", async ({ documentId, userId }) => {
      socket.join(documentId);
      console.log(`User ${userId} joined document ${documentId}`);
    });

    // ! User edits the document

    socket.on(
      "editDocument",
      async (data: { documentId: string; content: string; userId: string }) => {
        const { documentId, content, userId } = data;
        console.log(`✏️ User ${userId} edition the document ${documentId}`);

        const document = await documentService.getDocumentById(
          +documentId,
          +userId
        );

        console.log(document);

        if (document) {
          document.content = content;
          await documentService.saveDocument(document);

          //   ? Broadcast to all User

          socket.to(documentId).emit("updateDocument", content);

          await activityService.logDocumentActivity(
            "update-document",
            +userId,
            document
          );
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("User discoonected");

      Object.keys(activatedUser).forEach((documentId) => {
        activatedUser[documentId].forEach((userId) => {
          if (socket.id === userId) {
            activatedUser[documentId].delete(userId);
          }
        });
      });
    });
  });
};
