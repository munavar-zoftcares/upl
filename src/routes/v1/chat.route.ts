import Express from "express";
import { getAllMessages, getAllUsers } from "../../controller/chat.controller";

const chat = Express.Router();

chat.get("/users", getAllUsers);
chat.post("/allmessages", getAllMessages);
// chat.get("/users", message);
// auth.post("/loginwithotp", loginW);

export default chat;