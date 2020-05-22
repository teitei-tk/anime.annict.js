import * as Axios from "axios";
import { ExecutionResult } from "graphql";

import { ClientInterface, GraphQLClientOption, GraphQLRequestQuery } from ".";

export type Variables = {
  [key: string]: unknown;
};

export class GraphQLClient implements ClientInterface {
  readonly client: Axios.AxiosInstance;

  constructor(opt: GraphQLClientOption) {
    this.client = Axios.default.create({
      baseURL: opt.graphQLEndpoint || "https://api.annict.com/",
      headers: {
        ...opt.headers,
        ...{
          Authorization: `Bearer ${opt.accessToken}`,
        },
      },
    });
  }

  request<T extends ExecutionResult>(
    query: GraphQLRequestQuery,
    variables?: Variables
  ): Promise<Axios.AxiosResponse<T>> {
    return this.client.post<T>("graphql", {
      query,
      variables: variables ? variables : undefined,
    });
  }
}
