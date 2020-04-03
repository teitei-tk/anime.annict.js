import * as Axios from "axios";
import { ExecutionResult } from "graphql";

import {
  IClientInterface,
  IGraphQLClientOption,
  IGraphQLRequestQuery,
} from ".";

export class GraphQLClient implements IClientInterface {
  readonly client: Axios.AxiosInstance;

  constructor(opt: IGraphQLClientOption) {
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

  request(query: IGraphQLRequestQuery): Promise<ExecutionResult> {
    return this.client.post("graphql", {
      query,
    });
  }
}
