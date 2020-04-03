import * as Axios from "axios";
import { ExecutionResult } from "graphql";

import { ClientInterface, GraphQLClientOption, GraphQLRequestQuery } from ".";

export class GraphQLClient implements ClientInterface {
  readonly client: Axios.AxiosInstance;

  constructor(opt: GraphQLClientOption) {
    const headers = {
      ...opt.headers,
      ...{
        Authorization: `Bearer ${opt.accessToken}`,
      },
    };

    this.client = Axios.default.create({
      baseURL: opt.graphQLEndpoint,
      headers,
    });
  }

  request<T extends ExecutionResult>(
    query: GraphQLRequestQuery
  ): Promise<Axios.AxiosResponse<T>> {
    return this.client.post<T>("graphql", {
      query,
    });
  }
}
