import { Inject, Injectable } from "@nestjs/common";
import { Provider } from "./provider";
import { MelipayamakConfig, MelipayamakOptions, MelipayamakResponse } from "types/melipayamak";
import { NotificationTokens } from "types/general";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class MelipayamakService extends Provider {
  private MELIPAYAMAK_CONFIG: MelipayamakConfig;

  constructor(@Inject(NotificationTokens.MELIPAYAMAK) melipayamakConfig: MelipayamakConfig, private readonly httpService: HttpService) {
    super();
    this.MELIPAYAMAK_CONFIG = melipayamakConfig;
  }

  public async sendNotification(options: MelipayamakOptions): Promise<MelipayamakResponse> {
    if (!this.MELIPAYAMAK_CONFIG || !this.MELIPAYAMAK_CONFIG.console_url) {
      throw new Error("Melipayamak config is not defined");
    }

    try {
      const response = await this.httpService.axiosRef.post<MelipayamakResponse>(this.MELIPAYAMAK_CONFIG.console_url, {
        bodyId: options.bodyId,
        to: options.to.toString(),
        args: options.args,
      });

      return response.data;
    } catch (error) {
      console.log("Error - EasyNotification Melipayamak", JSON.stringify(error));
    }
  }
}
