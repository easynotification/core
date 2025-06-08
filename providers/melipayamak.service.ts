import { Inject, Injectable } from "@nestjs/common";
import { Provider } from "./provider";
import { MelipayamakApiResponse, MelipayamakConfig, MelipayamakErrorResponse, MelipayamakOptions, MelipayamakResponse, MelipayamakSuccessResponse } from "types/melipayamak";
import { BasicResponse, NotificationTokens } from "types/general";
import { HttpService } from "@nestjs/axios";
import { AxiosError } from "axios";
import { NotificationOptions } from "../types/general";

@Injectable()
export class MelipayamakService extends Provider {
  private MELIPAYAMAK_CONFIG: MelipayamakConfig;

  constructor(@Inject(NotificationTokens.MELIPAYAMAK) melipayamakConfig: MelipayamakConfig, private readonly httpService: HttpService) {
    super();
    this.MELIPAYAMAK_CONFIG = melipayamakConfig;
  }

  public async sendNotification(data: NotificationOptions): Promise<BasicResponse<MelipayamakSuccessResponse, MelipayamakErrorResponse>> {
    if (!this.MELIPAYAMAK_CONFIG || !this.MELIPAYAMAK_CONFIG.console_url) {
      throw new Error("Melipayamak config is not defined");
    }

    const options = data.options as MelipayamakOptions;

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
