export interface TelegramOptions {
  chat_id: string | number;
  text: string;
  parse_mode?: "Markdown" | "MarkdownV2" | "HTML";
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: any;
}

export interface TelegramConfig {
  token: string;
}

export interface TelegramResponse {
  ok: boolean;
  result?: TelegramSuccessResponse;
  error?: TelegramErrorResponse;
}

export interface TelegramSuccessResponse {
  message_id: number;
  from: TelegramFrom;
  chat: TelegramChat;
  date: number;
  text: string;
}

export interface TelegramFrom {
  id: number;
  is_bot: boolean;
  first_name: string;
  username: string;
}

export interface TelegramChat {
  id: number;
  first_name: string;
  username: string;
  type: string;
}

export interface TelegramErrorResponse {
  error_code: number;
  description: string;
}
