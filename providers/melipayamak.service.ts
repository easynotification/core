import { Inject, Injectable } from "@nestjs/common";
import { Provider } from "./provider";
import { MelipayamakApiResponse, MelipayamakConfig, MelipayamakOptions, MelipayamakResponse } from "types/melipayamak";
import { NotificationTokens } from "types/general";
import { HttpService } from "@nestjs/axios";
import { AxiosError } from "axios";

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
      const response = await this.httpService.axiosRef.post<MelipayamakApiResponse>(this.MELIPAYAMAK_CONFIG.console_url, {
        bodyId: options.bodyId,
        to: options.to.toString(),
        args: options.args,
      });

      return {
        ok: response.data.recId ? true : false,
        result: response.data.recId ? { recId: response.data.recId.toString() } : null,
        error: response.data.recId ? null : { status: response.data.status },
      };
    } catch (error) {
      console.log("Error - EasyNotification Melipayamak", JSON.stringify(error));
      if (error instanceof AxiosError) {
        return {
          ok: false,
          result: null,
          error: { status: error?.response?.data?.status },
        };
      } else {
        return {
          ok: false,
          result: null,
          error: { status: "خطایی نامشخص رخ داده است" },
        };
      }
    }
  }
}
