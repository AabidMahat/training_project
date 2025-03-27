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
      "joinDocument",
      async (data: { documentId: string; userId: string }) => {
        const { documentId, userId } = data;
        socket.join(documentId);

        // console.log("Received documentId:", documentId);
        // console.log("Received userId:", userId);

        console.log(`User ${userId} joined document ${documentId}`);
        

        //   ! Add user to the activatedUser Set

        if (!activatedUser[documentId]) {
          activatedUser[documentId] = new Set();
        }
        activatedUser[documentId].add(userId);

        //   ? Send list to all active user

        io.to(documentId).emit(
          "updateUserList",
          Array.from(activatedUser[documentId])
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

          await activityService.logActivity(
            "edit Document",
            +userId,
            +documentId
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
