import { ApolloClient, gql, InMemoryCache } from "@apollo/client/core";

const subgraphUrl = "https://api.thegraph.com/subgraphs/name/bytedeveloperr/falcor";

const slingSubgraphClient = new ApolloClient({ uri: subgraphUrl, cache: new InMemoryCache() });

export { slingSubgraphClient, gql };
