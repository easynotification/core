import { Inject, Injectable } from "@nestjs/common";
import { Provider } from "./provider";
import { BasicResponse, NotificationOptions, NotificationTokens } from "../types/general";
import { EmailConfig, EmailErrorResponse, EmailOptionsBasic, EmailSuccessResponse } from "../types/email";
import * as nodemailer from "nodemailer";
import { SendMailOptions } from "nodemailer";

@Injectable()
export class EmailService extends Provider {
  private transporter: nodemailer.Transporter;
  private EMAIL_CONFIG: EmailConfig;

  constructor(@Inject(NotificationTokens.EMAIL) emailConfig: EmailConfig) {
    super();
    this.EMAIL_CONFIG = emailConfig;
    this.transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.auth.username,
        pass: emailConfig.auth.password,
      },
    });
  }

  public async sendNotification(data: NotificationOptions): Promise<BasicResponse<EmailSuccessResponse, EmailErrorResponse>> {
    try {
      const options = data.options as EmailOptionsBasic;

      const mailOptions: SendMailOptions = {
        from: this.EMAIL_CONFIG.from || "noreply@example.com",
        ...options,
      };

      const response: EmailSuccessResponse = await this.transporter.sendMail({
        from: `${this.EMAIL_CONFIG.from} <${this.EMAIL_CONFIG.auth.username}>`,
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text ?? undefined,
        html: mailOptions.html ?? undefined,
      });

      return {
        ok: true,
        result: response,
        error: null,
      };
    } catch (error) {
      console.log("Error - EasyNotification Email", JSON.stringify(error));

      return {
        ok: false,
        result: null,
        error: {
          message: error.message,
          details: { ...error },
        },
      };
    }
  }
}
