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
            "edit Document",
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
