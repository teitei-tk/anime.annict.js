/* eslint-disable @typescript-eslint/camelcase */
import * as nock from "nock";

import { Authenticator } from "./../../annict";

describe("annict", () => {
  describe("Authenticator", () => {
    const client = new Authenticator();

    const clientId = "test_client_id";
    const clientSecret = "test_client_secret";
    const redirectUri = "test_redirect_uri";

    describe("authorize", () => {
      beforeEach(() => {
        nock("https://api.annict.com/oauth/")
          .get("/authorize")
          .query({
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: "code",
            scope: "read",
          })
          .reply(200);
      });

      it("when authorize", async () => {
        const response = await client.authorize({
          clientId: clientId,
          redirectUri: redirectUri,
          scope: ["read"],
        });
        expect(response).toMatchObject({ status: 200, statusText: null });
      });
    });

    describe("fetchToken", () => {
      const code = "abcdef";

      beforeEach(() => {
        nock("https://api.annict.com/oauth/")
          .post("/token", {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "authorization_code",
            redirect_uri: redirectUri,
            code: code,
          })
          .reply(200, {
            accessToken: "testToken",
            tokenType: "Bearer",
            scope: "read",
            createdAt: 1586159247,
          });
      });

      it("when fetchToken", async () => {
        const response = await client.fetchToken({
          clientId: clientId,
          clientSecret: clientSecret,
          redirectUri: redirectUri,
          code: code,
        });

        expect(response).toMatchObject({
          accessToken: "testToken",
          tokenType: "Bearer",
          scope: "read",
          createdAt: 1586159247,
        });
      });
    });

    describe("tokenInfo", () => {
      const accessToken = "abcdef";

      beforeEach(() => {
        nock("https://api.annict.com/oauth/", {
          reqheaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .get("/token/info")
          .reply(200, {
            resourceOwnerId: 1,
            scope: ["read"],
            expiresIn: null,
            application: { uid: "abcdef" },
            createdAt: 1586159247,
          });
      });

      it("when tokenInfo", async () => {
        const response = await client.tokenInfo({
          accessToken,
        });

        expect(response).toMatchObject({
          resourceOwnerId: 1,
          scope: ["read"],
          expiresIn: null,
          application: {
            uid: "abcdef",
          },
          createdAt: 1586159247,
        });
      });
    });

    describe("revoke", () => {
      const accessToken = "abcdef";

      beforeEach(() => {
        nock("https://api.annict.com/oauth/", {
          reqheaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .post("/revoke", {
            client_id: clientId,
            client_secret: clientSecret,
            token: accessToken,
          })
          .reply(200, {
            status: 200,
            statusText: null,
          });
      });

      it("when token revoke", async () => {
        const response = await client.revoke({
          clientId: clientId,
          clientSecret: clientSecret,
          token: accessToken,
        });

        expect(response).toMatchObject({ status: 200, statusText: null });
      });
    });
  });
});
