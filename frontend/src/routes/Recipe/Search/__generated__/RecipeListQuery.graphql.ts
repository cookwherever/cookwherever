/**
 * @generated SignedSource<<f5d6f84509887349d1239061840690a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RecipeListQuery$variables = {
  search: string;
};
export type RecipeListQuery$data = {
  readonly recipeRecipe: ReadonlyArray<{
    readonly id: any;
    readonly name: string;
    readonly source_provider: {
      readonly name: string | null;
    };
  }>;
};
export type RecipeListQuery = {
  response: RecipeListQuery$data;
  variables: RecipeListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "search"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "_ilike",
                "variableName": "search"
              }
            ],
            "kind": "ObjectValue",
            "name": "name"
          }
        ],
        "kind": "ObjectValue",
        "name": "where"
      }
    ],
    "concreteType": "RecipeRecipe",
    "kind": "LinkedField",
    "name": "recipeRecipe",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "RecipeSourceProvider",
        "kind": "LinkedField",
        "name": "source_provider",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RecipeListQuery",
    "selections": (v2/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RecipeListQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "ba2b727b8ee8e4b3b45efcd43f86a8de",
    "id": null,
    "metadata": {},
    "name": "RecipeListQuery",
    "operationKind": "query",
    "text": "query RecipeListQuery(\n  $search: String!\n) {\n  recipeRecipe(where: {name: {_ilike: $search}}) {\n    id\n    name\n    source_provider {\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "adfcb1aa11cbfaf4381731009722340e";

export default node;
