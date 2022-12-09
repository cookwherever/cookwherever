/**
 * @generated SignedSource<<96426094511172a3410e3f1386bc6e69>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ViewRecipeQuery$variables = {
  id: any;
};
export type ViewRecipeQuery$data = {
  readonly recipeRecipeByPk: {
    readonly directions: ReadonlyArray<{
      readonly id: any;
      readonly seq: number | null;
      readonly text: string | null;
    }>;
    readonly ingredients: ReadonlyArray<{
      readonly id: any;
      readonly seq: number | null;
      readonly text: string | null;
    }>;
    readonly name: string;
  } | null;
};
export type ViewRecipeQuery = {
  response: ViewRecipeQuery$data;
  variables: ViewRecipeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "seq": "ASC"
    }
  }
],
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "seq",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "text",
    "storageKey": null
  }
],
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "RecipeRecipe",
    "kind": "LinkedField",
    "name": "recipeRecipeByPk",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RecipeIngredient",
        "kind": "LinkedField",
        "name": "ingredients",
        "plural": true,
        "selections": (v2/*: any*/),
        "storageKey": "ingredients(orderBy:{\"seq\":\"ASC\"})"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RecipeDirection",
        "kind": "LinkedField",
        "name": "directions",
        "plural": true,
        "selections": (v2/*: any*/),
        "storageKey": "directions(orderBy:{\"seq\":\"ASC\"})"
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
    "name": "ViewRecipeQuery",
    "selections": (v3/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ViewRecipeQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "043d1f9085d505eb50c916f6f02ca634",
    "id": null,
    "metadata": {},
    "name": "ViewRecipeQuery",
    "operationKind": "query",
    "text": "query ViewRecipeQuery(\n  $id: uuid!\n) {\n  recipeRecipeByPk(id: $id) {\n    name\n    ingredients(orderBy: {seq: ASC}) {\n      id\n      seq\n      text\n    }\n    directions(orderBy: {seq: ASC}) {\n      id\n      seq\n      text\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dec88146147263c5a30fbb1fc1adc0bc";

export default node;
