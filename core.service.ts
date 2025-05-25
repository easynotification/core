import { Injectable } from "@nestjs/common";
import { EmailOptionsBasic, EmailOptions, EmailResponse } from "./types/email";
import { TelegramOptions, TelegramResponse } from "./types/telegram";
import { TelegramService } from "./providers/telegram.service";
import { EmailService } from "./providers/email.service";

@Injectable()
export class EasyNotificationService {
  constructor(private readonly telegramService: TelegramService, private readonly emailService: EmailService) {}

  public async sendNotification(type: "EMAIL", options: EmailOptions): Promise<EmailResponse>;
  public async sendNotification(type: "TELEGRAM", options: TelegramOptions): Promise<TelegramResponse>;
  public async sendNotification(type: never, options: never): Promise<EmailResponse | TelegramResponse> {
    switch (type) {
      case "EMAIL":
        return this.emailService.sendNotification(options as EmailOptionsBasic);
      case "TELEGRAM":
        return this.telegramService.sendNotification(options as TelegramOptions);
      default:
        throw new Error(`Unsupported notification type: ${type}`);
    }
  }
}
