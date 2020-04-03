import * as Axios from "axios";

export type GraphQLAccessToken = string;
export type GraphQLRequestQuery = string;

export type SeasonName = "AUTUMN" | "SPRING" | "SUMMER" | "WINTER";
export type Media = "MOVIE" | "OTHER" | "OVA" | "TV" | "WEB";

export interface ClientInterface {
  client: Axios.AxiosInstance;
}

export interface GraphQLClientOption {
  accessToken: GraphQLAccessToken;
  graphQLEndpoint: string;
  headers?: {
    "Content-Type": string;
  };
}

export type GraphQLSchema = string;
