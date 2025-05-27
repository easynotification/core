export interface MelipayamakConfig {
  console_url: string;
}

export interface MelipayamakOptions {
  to: string | number;
  bodyId: number;
  args: string[];
}

export interface MelipayamakResponse {
  recId: string;
  status: string;
}
