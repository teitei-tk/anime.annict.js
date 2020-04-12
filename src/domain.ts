import {
  GraphQLClient,
  GraphQLRequestQuery,
  Media,
  SeasonNameRequest,
  SeasonNameResponse,
} from ".";
import { ExecutionResult } from "graphql";

export type Season = {
  readonly seasonYear: number;
  readonly seasonName: SeasonNameRequest;
};

export const buildSeasonsQuery = (params: {
  seasons: Season[];
  first: number;
}): GraphQLRequestQuery => {
  const seasons = params.seasons
    .map((value) => {
      return `"${value.seasonYear}-${value.seasonName}"`;
    })
    .join(",");

  const query = `
  {
    searchWorks(seasons: [${seasons}], orderBy: { field: WATCHERS_COUNT, direction: DESC }, first: ${params.first}) {
      edges {
        node {
          annictId
          title
          watchersCount
          seasonName
          seasonYear
          media
        }
      }
    }
  }
  `;

  return query;
};

export interface SeasonQueryResult extends ExecutionResult {
  data: {
    searchWorks: {
      edges: Array<{
        node: {
          annictId: number;
          title: string;
          watchersCount: number;
          seasonName: SeasonNameResponse;
          seasonYear: number;
          media: Media;
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

  async findBySeason(param: {
    season: Season;
    first: number;
  }): Promise<SeasonQueryResult> {
    const query = buildSeasonsQuery({
      seasons: [param.season],
      first: param.first,
    });
    const response = await this.client.request<SeasonQueryResult>(query);

    return response.data;
  }

  async findBySeasons(params: {
    seasons: Season[];
    first: number;
  }): Promise<SeasonQueryResult> {
    const query = buildSeasonsQuery(params);
    const response = await this.client.request<SeasonQueryResult>(query);

    return response.data;
  }
}
