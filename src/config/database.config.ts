// import PostModel from "../model/post.model";
// import UserModel from "../model/user.model";
import { createConnection } from "typeorm";
import { User } from "../models/user.model";
import Document from "../models/document.model";

const AppDataSource = async () => {
  try {
    const connection = await createConnection({
      type: "mssql",
      host: "AABID",
      port: 1433,
      database: "master",
      entities: [User, Document],
      username: "sa",
      password: "123456",
      synchronize: true,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    });

    if (connection) {
      console.log("Database Connection Successfully");
    }
  } catch (err) {
    console.log("Error while connecting Database");
    console.log(err);
  }
};

export default AppDataSource;
