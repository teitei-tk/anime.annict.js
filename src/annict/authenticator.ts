/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosInstance } from "axios";
import * as Humps from "humps";
import Axios from "axios";

export type AuthorizeResponse = {
  readonly status: number;
  readonly statusText: string;
};

export type FetchTokenResponse = {
  readonly accessToken: string;
  readonly tokenType: string;
  readonly scope: string;
  readonly createdAt: number;
};

export type TokenInfoResponse = {
  readonly resourceOwnerId: number;
  readonly scopes: string[];
  readonly expiresInSeconds: number | null;
  readonly application: { uid: string };
  readonly createdAt: number;
};

export type RevokeResponse = {
  readonly status: number;
  readonly statusText: string;
};

export class Authenticator {
  readonly client: AxiosInstance;

  constructor(opt: { baseURL?: string } = {}) {
    this.client = axios.create({
      baseURL: opt.baseURL || "https://api.annict.com/oauth/",
      transformResponse: [
        ...[].concat(...[Axios.defaults.transformResponse]),
        (data): object[] => Humps.camelizeKeys(data),
      ],
    });
  }

  async authorize(arg: {
    clientId: string;
    redirectUri: string;
    scope: string[];
  }): Promise<AuthorizeResponse> {
    const response = await this.client.get("authorize", {
      params: {
        client_id: arg.clientId,
        redirect_uri: arg.redirectUri,
        response_type: "code",
        scope: Array.from(new Set(arg.scope).values()).join("+"),
      },
    });

    return { status: response.status, statusText: response.statusText };
  }

  async fetchToken(arg: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    code: string;
  }): Promise<FetchTokenResponse> {
    const response = await this.client.post(
      "token",
      {
        client_id: arg.clientId,
        client_secret: arg.clientSecret,
        grant_type: "authorization_code",
        redirect_uri: arg.redirectUri,
        code: arg.code,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }

  async tokenInfo(arg: { accessToken: string }): Promise<TokenInfoResponse> {
    const response = await this.client.get("token/info", {
      headers: {
        Authorization: `Bearer ${arg.accessToken}`,
      },
    });

    return response.data;
  }

  async revoke(arg: {
    clientId: string;
    clientSecret: string;
    token: string;
  }): Promise<RevokeResponse> {
    const response = await this.client.post(
      "revoke",
      {
        client_id: arg.clientId,
        client_secret: arg.clientSecret,
        token: arg.token,
      },
      {
        headers: {
          Authorization: `Bearer ${arg.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { status: response.status, statusText: response.statusText };
  }
}
