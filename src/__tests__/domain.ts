import * as nock from "nock";

import {
  Domain,
  GraphQLClient,
  buildSeasonsQuery,
  SeasonQueryResult,
} from "./../";

describe("annict", () => {
  describe("domain", () => {
    describe("findBySeason", () => {
      const accessToken = "abcdef";
      const client = new GraphQLClient({
        accessToken,
      });

      const query = buildSeasonsQuery({
        seasons: [
          {
            seasonName: "spring",
            seasonYear: 2019,
          },
        ],
        first: 3,
      });

      const responseData: SeasonQueryResult = {
        data: {
          searchWorks: {
            edges: [
              {
                node: {
                  annictId: 6089,
                  title: "鬼滅の刃",
                  watchersCount: 2579,
                  seasonName: "SPRING",
                  seasonYear: 2019,
                  media: "TV",
                },
              },
              {
                node: {
                  annictId: 5495,
                  title: "ワンパンマン (第2期)",
                  watchersCount: 1873,
                  seasonName: "SPRING",
                  seasonYear: 2019,
                  media: "TV",
                },
              },
              {
                node: {
                  annictId: 6498,
                  title: "進撃の巨人 Season 3 Part.2",
                  watchersCount: 1508,
                  seasonName: "SPRING",
                  seasonYear: 2019,
                  media: "TV",
                },
              },
            ],
          },
        },
      };

      const domain = new Domain(client);

      beforeEach(() => {
        nock("https://api.annict.com/", {
          reqheaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .post("/graphql", {
            query,
          })
          .reply(200, responseData);
      });

      it("when findBySeason", async () => {
        const response = await domain.findBySeason({
          season: {
            seasonYear: 2019,
            seasonName: "spring",
          },
          first: 3,
        });

        expect(response).toMatchObject(responseData);
      });

      describe("findBySeasons", () => {
        const accessToken = "abcdef";
        const client = new GraphQLClient({
          accessToken,
        });

        const query = buildSeasonsQuery({
          seasons: [
            {
              seasonName: "spring",
              seasonYear: 2019,
            },
            {
              seasonName: "summer",
              seasonYear: 2019,
            },
          ],
          first: 3,
        });

        const responseData: SeasonQueryResult = {
          data: {
            searchWorks: {
              edges: [
                {
                  node: {
                    annictId: 6089,
                    title: "鬼滅の刃",
                    watchersCount: 2579,
                    seasonName: "SPRING",
                    seasonYear: 2019,
                    media: "TV",
                  },
                },
                {
                  node: {
                    annictId: 5495,
                    title: "ワンパンマン (第2期)",
                    watchersCount: 1873,
                    seasonName: "SPRING",
                    seasonYear: 2019,
                    media: "TV",
                  },
                },
                {
                  node: {
                    annictId: 6463,
                    title: "ダンベル何キロ持てる？",
                    watchersCount: 1850,
                    seasonName: "SUMMER",
                    seasonYear: 2019,
                    media: "TV",
                  },
                },
              ],
            },
          },
        };

        const domain = new Domain(client);

        beforeEach(() => {
          nock("https://api.annict.com/", {
            reqheaders: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .post("/graphql", {
              query,
            })
            .reply(200, responseData);
        });

        it("when findBySeasons", async () => {
          const response = await domain.findBySeasons({
            seasons: [
              {
                seasonYear: 2019,
                seasonName: "spring",
              },
              {
                seasonYear: 2019,
                seasonName: "summer",
              },
            ],
            first: 3,
          });

          expect(response).toMatchObject(responseData);
        });
      });
    });
  });
});
