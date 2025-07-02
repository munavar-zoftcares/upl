// import express from 'express';
import cors from 'cors'
// import pool from './db/postgres';
import AppRoutes from "./routes/index"
import * as net from 'net';

import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import { errorMiddleware } from './middleware/errorMiddleware';
import { setupWebSocket } from './utils/realTime';
import pool from './db/postgres';
import nodemailer, { SentMessageInfo } from 'nodemailer';
// import Imap from 'imap';
import { simpleParser } from 'mailparser';
import Imap from 'node-imap';
import Connection from 'node-imap';
// import { simpleParser } from 'mailparser';

const app = express();
const port = 3000;
app.use(cors({
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST'],   
  allowedHeaders: ['Content-Type'], 
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(errorMiddleware);


async function setDb(){ 
  await pool.connect()
}

setDb
app.use('/', AppRoutes);

 
app.get('/ss',(req,res)=>{
  res.send("Ssssss")
})
// Create an HTTP server from the Express app
const server = http.createServer(app); 
setupWebSocket(server)
// Initialize WebSocket server
// const wss = new WebSocket.Server({ server }); 

// Define WebSocket connection handling
// wss.on('connection', (ws: WebSocket) => {
//   console.log('New WebSocket connection');
//   // Handle incoming messages from clients
//   ws.on('message', (message: WebSocket.MessageEvent) => {
//     const data = JSON.parse(message.toString());
//     console.log(data)
//     console.log(`Received message => ${message}`);
//   });
//   // Send a welcome message to the connected client
//   ws.send('Welcome to the WebSocket server!');
// });

// Start the Express server
//...................................send mail ..................................................
// Import the Nodemailer library
// const nodemailer = require('nodemailer');

// Create a transporter object
// const transporter = nodemailer.createTransport({
//   host: 'live.smtp.mailtrap.io',
//   port: 587,
//   secure: false, // use SSL
//   auth: {
//     user: '1a2b3c4d5e6f7g',
//     pass: '1a2b3c4d5e6f7g',
//   }
// });
//........................................................................................................................

// const transporter = nodemailer.createTransport({
//   service: 'gmail',  // Gmail is used here, but you can use other services like Outlook, Yahoo, etc.
//   auth: {
//     user: 'mnvrlogs@gmail.com', // Your email address
//     pass: 'sgsjjedjncpeebto'  // Your email password or an app-specific password (for Gmail with 2FA enabled)
//   }
// });
// // Configure the mailoptions object
// const mailOptions = {
//   from: 'mnvrlogs@gmail.com',
//   to: 'mubas6152@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!',
//   html: '<h1>This is an HTML email</h1><p>It can contain <strong>HTML</strong> content.</p> <button>click here </button>'
// };
// // Send the email
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log('Error:', error);
//   } else {
//     console.log('Email sent:', info.response);
//   }
// });

//...............................................................................................

//..............RECIEVE................................................................................


// const imapConfig = {
//   user: 'mnvrlogs@gmail.com', // Your email address
//   password: 'sgsjjedjncpeebto', // Your email password or app-specific password
//   host: 'imap.gmail.com', // IMAP server address (e.g., Gmail's is imap.gmail.com)
//   port: 993, // IMAP SSL port
//   tls: true, // Use TLS
// };

// // Create a new IMAP connection
// const imap = new Imap(imapConfig);

// // Function to open the mailbox
// const openInbox = (cb: any) => {
//   imap.openBox('INBOX', true, cb); // Open the inbox folder in read-only mode
// };

// // Function to fetch unread emails
// const fetchUnreadEmails = () => {
//   openInbox((err: Error, box: any) => {
//     if (err) throw err;

//     // Search for unread messages
//     const searchCriteria = ['UNSEEN']; // Look for unread emails
//     const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true };

//     imap.search(searchCriteria, (err: Error, results: any) => {
//       if (err) throw err;

//       if (results.length === 0) {
//         console.log('No new emails.');
//         return;
//       }

//       // Fetch unread emails
//       const fetch = imap.fetch(results, fetchOptions);
//       fetch.on('message', (msg: any, seqno: any) => {
//         console.log(`Processing email #${seqno}`);
//         const emailData: any = {};

//         msg.on('body', (stream: any) => {
//           simpleParser(stream, (err: Error, parsed: any) => {
//             if (err) {
//               console.log('Error parsing email:', err);
//               return;
//             }

//             // Save or process the parsed email content
//             emailData.subject = parsed.subject;
//             emailData.from = parsed.from?.text;
//             emailData.text = parsed.text;
//             emailData.html = parsed.html;

//             console.log('Email received:', emailData);
//           });
//         });
//       });

//       fetch.once('end', () => {
//         console.log('Finished fetching emails');
//         imap.end(); // End the IMAP connection after processing
//       });
//     });
//   });
// };

// // Connect to the IMAP server
// imap.connect();

// // Listen for incoming emails
// imap.on('ready', () => {
//   console.log('IMAP connection is ready.');
//   fetchUnreadEmails(); // Start fetching emails
// });

// imap.on('error', (err: Error) => {
//   console.error('IMAP error:', err);
// });

// imap.on('end', () => {
//   console.log('IMAP connection closed.');
// });


//.....................................................RECIEVE..............................................................
// declare module 'node-imap' {
//   interface Connection {
//     idle(): void;
//   }
// }


const emailConfigs = [
  {
    user: 'mnvrlogs@gmail.com',
    password: 'sgsjjedjncpeebto',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
  },
  // {
  //   user: 'email2@example.com',
  //   password: 'password2',
  //   host: 'imap.example.com',
  //   port: 993,
  //   tls: true,
  //   tlsOptions: { rejectUnauthorized: false }
  // },
  // Add more email configurations here...
];

// Function to process incoming email
// Function to process incoming email


//.....................................................RECIEVE..............................................................



//....................................................................................................................


server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
 
