import { BasicResponse, ErrorResponse, SuccessResponse, NotificationOptions } from "../types/general";

export abstract class Provider {
  abstract sendNotification(options: NotificationOptions): Promise<BasicResponse<SuccessResponse, ErrorResponse>>;
}
