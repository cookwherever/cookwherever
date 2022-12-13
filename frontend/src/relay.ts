import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { env } from './env';

export async function fetchGraphQL(text: string, variables: any) {
  // Fetch data from GitHub's GraphQL API:
  const response = await fetch(env.GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'X-Hasura-Admin-Secret': 'password',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return response.json();
}

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
async function fetchRelay(params: any, variables: any) {
  console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`);
  return fetchGraphQL(params.text, variables);
}

// Export a singleton instance of Relay Environment configured with our network function:
export const RelayEnvironment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
