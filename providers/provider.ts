import { MelipayamakOptions } from "types/melipayamak";
import { MelipayamakResponse } from "types/melipayamak";
import { EmailOptionsBasic, EmailResponse } from "../types/email";
import { TelegramOptions, TelegramResponse } from "../types/telegram";

export abstract class Provider {
  abstract sendNotification(options: TelegramOptions | EmailOptionsBasic | MelipayamakOptions): Promise<TelegramResponse | EmailResponse | MelipayamakResponse>;
}
