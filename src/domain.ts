import { GraphQLClient, GraphQLRequestQuery, Media, SeasonName } from ".";
import { GraphQLError, ExecutionResult } from "graphql";

export const buildSeasonQuery = (params: {
  seasonYear: number;
  seasonName: SeasonName;
}): GraphQLRequestQuery => {
  const season = `${params.seasonYear}-${params.seasonName}`;
  const query = `searchWorks(seasons: [$season], orderBy: { field: WATCHERS_COUNT, direction: DESC }) {
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

  return JSON.stringify({
    query,
    variables: { season },
  });
};

export interface SeasonQueryResult extends ExecutionResult {
  data: {
    searchWorks: {
      edges: Array<{
        node: {
          annictId: number;
          title: string;
          seasonName: SeasonName;
          seasonYear: number;
          media: Media;
          programs: {
            edges: Array<{
              node: {
                episode: {
                  number: number;
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
  private readonly client: GraphQLClient;

  constructor(client: GraphQLClient) {
    this.client = client;
  }

  async findBySeason(
    seasonYear: number,
    seasonName: SeasonName
  ): Promise<SeasonQueryResult | readonly GraphQLError[]> {
    const query = buildSeasonQuery({ seasonYear, seasonName });
    const r = await this.client.request<SeasonQueryResult>(query);
    if (r.data.errors.length > 0) {
      return r.data.errors;
    }

    return r.data;
  }
}
