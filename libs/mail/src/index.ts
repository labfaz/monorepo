import nodemailer from "nodemailer"
import dotenv from "dotenv"

import Mail from "nodemailer/lib/mailer"

dotenv.config()
export interface Addres {
  name: string,
  email: string
}

export interface EmailInfo {
  to: Addres,
  from: Addres,
  subject?: string,
  html?: string
  text?: string
}

export type SentMessageInfo = any;

interface SendEmail {
  sendEmail: (data: EmailInfo) => Promise<SentMessageInfo>
}


export class MailProvider implements SendEmail {
  private readonly transponder: Mail
  constructor () {
    function getOptions(){
      if (
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "staging" ||
        process.env.NODE_ENV === "preview"
      ) {
        return {
          host: `smtp.${process.env.HOST}.email`,
          service: process.env.HOST,
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.APPPASS
          },
          requireTLS: true
        }
      }
      // NOTE: mailcatcher config, see root docker-compose.yml for info
      return {
        host: "localhost",
        port: 1025
      }
    }
    this.transponder = nodemailer.createTransport(getOptions())
  }

  async sendEmail(data: EmailInfo): Promise<SentMessageInfo> {
    return await this.transponder.sendMail({
      to: {
        name: data.to.name,
        address: data.to.email
      },
      from: {
        name: data.from.name,
        address: data.from.email
      },
      subject: data.subject ?? "",
      html: data.html,
      text: data.text,
    })
  }
}
