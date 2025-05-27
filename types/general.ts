import { EmailConfig, EmailOptionsBasic } from "./email";
import { MelipayamakConfig, MelipayamakOptions } from "./melipayamak";
import { TelegramConfig, TelegramOptions } from "./telegram";

export type NotificationOptions = EmailOptionsBasic | TelegramOptions | MelipayamakOptions;

export type NotificationType = "EMAIL" | "TELEGRAM" | "MELIPAYAMAK";

export interface Config {
  isGlobal?: boolean;
  telegramOptions?: TelegramConfig;
  emailOptions?: EmailConfig;
  melipayamakOptions?: MelipayamakConfig;
}

export enum NotificationTokens {
  TELEGRAM = "INJECT_TELEGRAM_TOKEN",
  EMAIL = "INJECT_EMAIL_TOKEN",
  MELIPAYAMAK = "INJECT_MELIPAYAMAK_TOKEN",
}
