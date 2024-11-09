import { QUERY } from "./queries";

const GRAPHQL_ENDPOINT = 'https://learn.reboot01.com/api/graphql-engine/v1/graphql';

interface GraphQlResponse<T> {
    data: T;
    errors?: {message: string} [];
}

export const graphqlRequest = async <T>(query: string): Promise<GraphQlResponse<T>> => {
    const token = localStorage.getItem('jwt'); // Update token management as needed
  
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });
  
    const result = await response.json();
    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
    }
    return result;
  };