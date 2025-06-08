import { EmailConfig, EmailErrorResponse, EmailOptionsBasic, EmailSuccessResponse } from "./email";
import { MelipayamakConfig, MelipayamakErrorResponse, MelipayamakOptions, MelipayamakSuccessResponse } from "./melipayamak";
import { TelegramConfig, TelegramErrorResponse, TelegramOptions, TelegramSuccessResponse } from "./telegram";

export type NotificationType = "EMAIL" | "TELEGRAM" | "MELIPAYAMAK";

export type NotificationOptions = {
  type: NotificationType;
  options: EmailOptionsBasic | TelegramOptions | MelipayamakOptions;
};

export interface BasicResponse<T, E> {
  ok: boolean;
  result?: T;
  error?: E;
}

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

export type SuccessResponse = TelegramSuccessResponse | EmailSuccessResponse | MelipayamakSuccessResponse;

export type ErrorResponse = TelegramErrorResponse | EmailErrorResponse | MelipayamakErrorResponse;
