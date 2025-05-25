import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { Provider } from "./provider";
import { NotificationTokens } from "../types/general";
import { TelegramConfig, TelegramOptions, TelegramResponse } from "../types/telegram";

@Injectable()
export class TelegramService extends Provider {
  private BOT_TOKEN: string;
  private BASE_URL: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(NotificationTokens.TELEGRAM) telegramConfig: TelegramConfig,
  ) {
    super();
    this.BOT_TOKEN = telegramConfig.token;
    this.BASE_URL = `https://api.telegram.org/bot${this.BOT_TOKEN}`;
  }

  public async sendNotification(options: TelegramOptions): Promise<TelegramResponse> {
    if (!this.BOT_TOKEN) {
      throw new Error("BOT_TOKEN is not set");
    }

    try {
      const url = `${this.BASE_URL}/sendMessage`;

      const response = await this.httpService.axiosRef.post<TelegramResponse>(url, options);

      return response.data;
    } catch (error) {
      console.log("Error - EasyNotification Telegram", JSON.stringify(error));
      return {
        ok: false,
        error: {
          description: error.response.data.description,
          error_code: error.response.data.error_code,
        },
      };
    }
  }
}
