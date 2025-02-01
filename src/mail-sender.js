const nodemailer = require("nodemailer");

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    console.log("sendEmail");
    const message = {
      from: "Open Music Apps",
      to: targetEmail,
      subject: "Ekspor Playlist Music",
      text: "Terlampir hasil dari ekspor Playlist",
      attachments: [
        {
          filename: "playlist.json",
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
