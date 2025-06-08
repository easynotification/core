import { Injectable } from "@nestjs/common";
import { EmailOptions, EmailSuccessResponse, EmailErrorResponse } from "./types/email";
import { TelegramErrorResponse, TelegramOptions, TelegramSuccessResponse } from "./types/telegram";
import { TelegramService } from "./providers/telegram.service";
import { EmailService } from "./providers/email.service";
import { MelipayamakErrorResponse, MelipayamakOptions, MelipayamakSuccessResponse } from "./types/melipayamak";
import { MelipayamakService } from "./providers/melipayamak.service";
import { BasicResponse, ErrorResponse, NotificationOptions, SuccessResponse } from "./types/general";

@Injectable()
export class EasyNotificationService {
  constructor(private readonly telegramService: TelegramService, private readonly emailService: EmailService, private readonly melipayamakService: MelipayamakService) {}

  public sendNotification(request: { type: "MELIPAYAMAK"; options: MelipayamakOptions }): Promise<BasicResponse<MelipayamakSuccessResponse, MelipayamakErrorResponse>>;
  public sendNotification(request: { type: "EMAIL"; options: EmailOptions }): Promise<BasicResponse<EmailSuccessResponse, EmailErrorResponse>>;
  public sendNotification(request: { type: "TELEGRAM"; options: TelegramOptions }): Promise<BasicResponse<TelegramSuccessResponse, TelegramErrorResponse>>;
  public async sendNotification(request: NotificationOptions): Promise<BasicResponse<SuccessResponse, ErrorResponse>> {
    switch (request.type) {
      case "EMAIL":
        return this.emailService.sendNotification(request);
      case "TELEGRAM":
        return this.telegramService.sendNotification(request);
      case "MELIPAYAMAK":
        return this.melipayamakService.sendNotification(request);
      default:
        throw new Error(`Unsupported notification type: ${request.type}`);
    }
  }
}
