module.exports = {
  schema: [
    {
      'https://food.vanderpot.net/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': 'ilikefood123',
        },
      },
    },
  ],
  documents: ['./src/**/*.{js,jsx,ts,tsx}'],
  overwrite: true,
  generates: {
    './src/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
