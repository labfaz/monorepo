declare module "nodemailer-sendinblue-transport" {
  export default class SendinBlueTransport extends Transport {
    constructor(opts: { apiKey: string }) {}
  }
}
