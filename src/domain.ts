import { GraphQLClient, Media, SeasonName } from ".";

export const buildSeasonQuery = (params: {
  seasonYear: Number;
  seasonName: SeasonName;
}) => {
  const season = `${params.seasonYear}-${params.seasonName}`;

  return `searchWorks(seasons: ["${season}"], orderBy: { field: WATCHERS_COUNT, direction: DESC }) {
    edges {
      node {
        annictId
        title
        watchersCount
        seasonName
        seasonYear
        media
        programs(orderBy: { field: STARTED_AT, direction: ASC }) {
          edges {
            node {
              episode {
                number
                numberText
              }
              channel {
                id
                name
              }
              startedAt
            }
          }
        }
      }
    }
  }`;
};

export interface ISeasonQueryResult {
  data: {
    searchWorks: {
      edges: Array<{
        node: {
          annictId: Number;
          title: string;
          seasonName: SeasonName;
          seasonYear: Number;
          media: Media;
          programs: {
            edges: Array<{
              node: {
                episode: {
                  number: Number;
                  numberText: string;
                };
              };
              channel: {
                id: string;
                name: string;
              };
              startedAt: string;
            }>;
          };
        };
      }>;
    };
  };
}

export class Domain {
  readonly client: GraphQLClient;

  constructor(client: GraphQLClient) {
    this.client = client;
  }

  async findBySeason(
    seasonYear: Number,
    seasonName: SeasonName
  ): Promise<ISeasonQueryResult> {
    const query = buildSeasonQuery({ seasonYear, seasonName });
    const r = await this.client.request(query);

    return r.data as ISeasonQueryResult;
  }
}
