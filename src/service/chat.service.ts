import pool from "../db/postgres";
import { HttpException } from "../utils/HTTPException";

export async function send(message:any):Promise<any>{

}

export async function allUsers():Promise<any>{
    // const res = await pool.query('SELECT * FROM user40');
 const getusers = await pool.query('select * from user40')
 const users = getusers.rows
    return users
}
export async function allMessages(senderid:any,recieverid:any):Promise<any>{
    const rrv = await pool.query(`select * from chat`)
    console.log("aaaaqqqqrrrr",rrv.rows)
    console.log("iddd1",senderid,"idddd2",recieverid)
    const vv = rrv.rows.find(msg => 
      (msg.person1.id === senderid || msg.person1.id === recieverid) &&
      (msg.person2.id === senderid || msg.person2.id === recieverid)
  ); 
  console.log("thevv",vv)  
  if(!vv){
    throw new HttpException(404,'not found')
  }
    return vv
}
    