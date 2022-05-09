import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "710ae278f8c243",
    pass: "b0c266fcb1c718",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <support@feedget.com>",
      to: "Paulo Horacio <paulo.wueliton@hotmail.com>",
      subject,
      html: body,
    });
  }
}
