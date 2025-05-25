import { EmailConfig, EmailOptionsBasic } from "./email";
import { TelegramConfig, TelegramOptions } from "./telegram";

export type NotificationOptions = EmailOptionsBasic | TelegramOptions;

export type NotificationType = "EMAIL" | "TELEGRAM";

export interface Config {
  isGlobal?: boolean;
  telegramOptions?: TelegramConfig;
  emailOptions?: EmailConfig;
}

export enum NotificationTokens {
  TELEGRAM = "INJECT_TELEGRAM_TOKEN",
  EMAIL = "INJECT_EMAIL_TOKEN",
}
