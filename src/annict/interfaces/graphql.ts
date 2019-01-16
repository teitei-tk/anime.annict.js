import * as Axios from "axios";
import { ExecutionResult } from "graphql";

export type IGraphQLAccessToken = string;
export type IGraphQLRequestQuery = string;

export type SeasonName = "AUTUMN" | "SPRING" | "SUMMER" | "WINTER";
export type Media = "MOVIE" | "OTHER" | "OVA" | "TV" | "WEB";

export interface IClientInterface {
  client: Axios.AxiosInstance;

  request(query: IGraphQLRequestQuery): Promise<ExecutionResult>;
}

export interface IGraphQLClientOption {
  accessToken: IGraphQLAccessToken;
  graphQLEndpoint: string;
  headers?: {
    "Content-Type": string;
  };
}

export type IGraphQLSchema = string;
