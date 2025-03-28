import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "app/schema.json",
  documents: ["app/graphql/**/*.ts"],
  generates: {
    "app/graphql/generated/": {
      preset: "client",
      config: {
        dedupeFragments: true,
        skipTypename: false,
        enumsAsTypes: true,
        scalars: {
          DateTime: "string",
          Date: "string",
          JSONString: "string"
        }
      },
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config; 