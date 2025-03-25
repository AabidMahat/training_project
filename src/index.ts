import app from "./app";
import AppDataSource from "./config/database.config";

AppDataSource();

app.listen(3000, () => {
  console.log("Listening on port " + 3000);
});
