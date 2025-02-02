require("dotenv").config();
const amqp = require("amqplib");
const PlaylistService = require("./playlist-service");
const MailSender = require("./mail-sender");
const Listener = require("./listener");

const init = async () => {
  console.log("Consumer started");
  const queueName = "export:playlist";

  const playlistService = new PlaylistService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);

  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, {
    durable: true,
  });

  channel.consume(
    queueName,
    (msg) => {
      console.log("Message received");
      listener.listen(msg);
    },
    { noAck: true },
  );
  console.log("Waiting for messages in queue...");
};

init();
