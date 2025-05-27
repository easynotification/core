export interface MelipayamakConfig {
  console_url: string;
}

export interface MelipayamakOptions {
  to: string | number;
  bodyId: number;
  args: string[];
}

export interface MelipayamakApiResponse {
  recId: number;
  status: string;
}

export interface MelipayamakResponse {
  ok: boolean;
  result: MelipayamakSuccessResponse;
  error: MelipayamakErrorResponse;
}

export interface MelipayamakSuccessResponse {
  recId: string;
}

export interface MelipayamakErrorResponse {
  status: string;
}
