export interface EmailOptionsBasic {
  to: string;
  subject: string;
}

export type EmailOptions = EmailOptionsBasic & ({ text: string } | { html: string });

export interface EmailConfig {
  from: string;
  host: string;
  port: number;
  secure: boolean;
  auth: {
    username: string;
    password: string;
  };
}

export interface EmailResponse {
  ok: boolean;
  result?: EmailSuccessResponse;
  error?: EmailErrorResponse;
}

export interface EmailSuccessResponse {
  accepted: string[];
  rejected: any[];
  ehlo: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export interface Envelope {
  from: string;
  to: string[];
}

export interface EmailErrorResponse {
  message: string;
  details: object;
}
