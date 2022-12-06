export const env = process.env.NODE_ENV === 'development' ? {
  GRAPHQL_URL: 'http://localhost:4455/api/hasura/v1beta1/relay',
  KRATOS_URL: 'http://localhost:4455/api/kratos',
} : {
  GRAPHQL_URL: 'https://recipes.cookwherever.com/api/hasura/v1beta1/relay',
  KRATOS_URL: 'https://recipes.cookwherever.com/api/kratos',
};

