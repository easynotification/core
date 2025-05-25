import { EmailOptionsBasic, EmailResponse } from "../types/email";
import { TelegramOptions, TelegramResponse } from "../types/telegram";

export abstract class Provider {
  abstract sendNotification(options: TelegramOptions | EmailOptionsBasic): Promise<TelegramResponse | EmailResponse>;
}
