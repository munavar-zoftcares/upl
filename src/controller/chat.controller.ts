import { Request, Response } from "express";
import { allMessages, allUsers, send } from "../service/chat.service";

export async function sendTheMessage(req: Request,res: Response): Promise<void> {
    try {
        const message = req.body
      const sendTheMessage = await send(message);
      res.status(200).send(sendTheMessage);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  export async function getAllUsers(req:Request,res:Response):Promise<void>{
try{
    const getAllUsers = await allUsers();
    res.status(200).send(getAllUsers);
}
catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
  }

  export async function getAllMessages(req:Request,res:Response):Promise<void>{
    try{
      const {senderid,recieverid} = req.body 
      console.log("bodyid",senderid,recieverid)
        const getAllUsers = await allMessages(senderid,recieverid);
        res.status(200).send(getAllUsers);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
      }
      }