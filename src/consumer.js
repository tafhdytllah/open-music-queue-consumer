require("dotenv").config();
const amqp = require("amqplib");
const PlaylistService = require("./playlist-service");
const MailSender = require("./mail-sender");
const Listener = require("./listener");

const init = async () => {
  console.log("Worker started");
  const playlistService = new PlaylistService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);

  const channel = await connection.createChannel();

  await channel.assertQueue("export:playlist", {
    durable: true,
  });

  channel.consume("export:playlist", listener.listen, { noAck: true });
  console.log("Waiting for messages in queue...");
};

init();
