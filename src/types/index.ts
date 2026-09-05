export interface GuacParameters {
  hostname: string;
  port: string;
  username: string;
  password?: string;
  security: string;
  "ignore-cert": string;
  width: string;
  height: string;
  "color-depth": string;
  "enable-drive": string;
  "drive-name": string;
  "drive-path": string;
  "create-drive-path": string;
  "enable-font-smoothing": string;
}

export interface GuacConnection {
  name: string;
  protocol: string;
  parentIdentifier: string;
  parameters: GuacParameters;
  attributes: {
    "max-connections": string;
    "max-connections-per-user": string;
  };
}

export interface ConnectionState {
  id: string;
  selected: boolean;
  data: GuacConnection;
}

export type RememberedFields = {
  name?: string;
  host?: string;
  user?: string;
  pass?: string;
};
