import http from 'http';
import WebSocket, { Server as WebSocketServer } from 'ws';
import pool from '../db/postgres';
import { RequestHandler, Request, Response, NextFunction, request } from 'express';

// let resp :any
function setupWebSocket(server: http.Server) {
    const wss = new WebSocketServer({ server });
    wss.on('connection', (ws: WebSocket) => {
      console.log('New WebSocket connection');
  
      ws.on('message', (message: WebSocket.MessageEvent) => {
           let data =  JSON.parse(message.toString());
   
        console.log("aaaaa",data) 
        // console.log(`Received message => ${message}`);
        // Broadcast message to all clients  
// ws.send(JSON.stringify(data))       
        // broadcastMessage(wss, data);
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data)); 
          }
        });
        saveToDB(data)
      }); 
    //   ws.send(data) 
    });
  
  }

  
//   function broadcastMessage(wss: WebSocketServer, 
//     // message: WebSocket.MessageEvent
// data:any
//   ) {
  
//   }

async function saveToDB(data:any){
console.log("itsrunssss")


    await pool.query(
      `
                CREATE TABLE IF NOT EXISTS chat (
                    id SERIAL PRIMARY KEY,
                    person1 JSONB NOT NULL,
                    person2 JSONB NOT NULL
                );
            `
    )
    console.log("itsrunsssssssss22222")
  //  const finduser =await  pool.query(`
  //  SELECT * FROM chat 
  //   `)
console.log(data)
    // const foundMessage/s = finduser.rows.filter((msg:any) => msg.id === data.senderid && msg.);
    const rrv = await pool.query(`select * from chat`)
    console.log(rrv.rows)
    const vv = rrv.rows.find(msg => 
      (msg.person1.id === data.senderid || msg.person1.id === data.recieverid) &&
      (msg.person2.id === data.senderid || msg.person2.id === data.recieverid)
  );
  
  console.log("vv",vv)
  if(vv){ 
//     if(vv.person1.id===data.senderid){
// const pp = vv.person1.allmessages.push({message:data.message,time:"now"})
// const query = `
// UPDATE chat
// SET person1 = $1
// WHERE id = $2
// RETURNING *;
// `;
// const values = [
// JSON.stringify(pp),
// vv.id
// ];
// const res = await pool.query(query, values);
//     return res
//   }else{
//     const pp = vv.person2.allmessages.push({message:data.message,time:"now"})
//     const query = `
//     UPDATE chat
//     SET person2 = $1
//     WHERE id = $2
//     RETURNING *;
//     `;
//     const values = [
//     JSON.stringify(pp),
//     vv.id
//     ];
//     const res = await pool.query(query, values);
//         return res 
//   }  
if (vv.person1.id === data.senderid) {
  // Push the new message to person1's messages
  vv.person1.allmessages.push({ message: data.message, time: "now" });
  
  const query = `
      UPDATE chat
      SET person1 = $1
      WHERE id = $2
      RETURNING *;
  `;
  const values = [
      JSON.stringify(vv.person1), // Updated person1 object
      vv.id
  ];
  
  const res = await pool.query(query, values);
  return res; 
} else {
  // Push the new message to person2's messages
  vv.person2.allmessages.push({ message: data.message, time: "now" });
  
  const query = `
      UPDATE chat
      SET person2 = $1
      WHERE id = $2
      RETURNING *;
  `;
  const values = [
      JSON.stringify(vv.person2), // Updated person2 object
      vv.id
  ];
  
  const res = await pool.query(query, values);
  return res; 
} 

}else{
const query = `
INSERT INTO chat (person1, person2) 
VALUES ($1, $2) RETURNING *;
`;

const person1 = {
  id:data.senderid,
  allmessages:[{
message:data.message,
time:"now"
}]}

const person2 = {
id:data.recieverid,
allmessages:[{
  message:null,
  time:null
  }]
}

const values = [
JSON.stringify(person1),
JSON.stringify(person2),
];

const resp = await pool.query(query, values); 
console.log("resp",resp.rows)

// res.status(200).send(resp.rows)
}
}  
  export { setupWebSocket };

//   person1:{
//     id:1,
//     messages:[{
// message:"",time:
//     }]
//   }
//   person2:{
//     id:1,
//     messages:[{
// message:"",time:
//     }]
//   }
