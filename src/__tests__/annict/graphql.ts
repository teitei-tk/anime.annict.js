import * as nock from "nock";

import { GraphQLClient } from "./../../annict";

describe("annict", () => {
  describe("GraphQLClient", () => {
    const accessToken = "abcdef";

    const client = new GraphQLClient({
      accessToken,
    });

    describe("request", () => {
      const query = `query ($season: String!, $first: Int) {
        searchWorks(seasons: [$season], orderBy: { field: WATCHERS_COUNT, direction: DESC }, first: $first) {
          edges {
            node {
              annictId
              title
            }
          }
        }
      }`;

      const variables = {
        season: "2018-autumn",
        first: 1,
      };

      type ResponseType = {
        data: {
          searchWorks: {
            edges: [
              {
                node: {
                  annictId: number;
                  title: string;
                };
              }
            ];
          };
        };
      };

      const responseData = {
        data: {
          searchWorks: {
            edges: [
              {
                node: {
                  annictId: 1,
                  title: "test title",
                },
              },
            ],
          },
        },
      };

      beforeEach(() => {
        nock("https://api.annict.com/", {
          reqheaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .post("/graphql", {
            query,
            variables,
          })
          .reply(200, responseData);
      });

      it("when graphql request", async () => {
        const response = await client.request<ResponseType>(query, variables);

        expect(response.data).toMatchObject(responseData);
      });
    });
  });
});
