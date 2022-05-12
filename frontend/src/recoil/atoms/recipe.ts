import {atom, selector} from 'recoil';
import {
  Recipes,
} from '../../generated/graphql';

export type TimestampPosition = 'start' | 'end';

export interface FocusedDirectionTimestamp {
  idx: number
  position: TimestampPosition
}

export const initialFocusedDirectionTimestamp: FocusedDirectionTimestamp = {
  idx: 0,
  position: 'start'
}

export interface CurrentRecipeStep {
  timestamp?: number;
  timestampEnd?: number;
}

export interface Timer {
  id: string;
  stepNumber: number;
  time: number;
}

export interface RecipeState {
  invalidated: boolean;
  reportedTimestamp: number | undefined;
  focusedDirectionTimestamp: FocusedDirectionTimestamp;
  currentRecipeStep: CurrentRecipeStep | null;
  timers: Timer[]
  recipe: Recipes
}

export const recipeViewerState = atom<RecipeState>({
  key: 'Recipe',
  default: {
    invalidated: false,
    reportedTimestamp: undefined,
    focusedDirectionTimestamp: initialFocusedDirectionTimestamp,
    currentRecipeStep: null,
    timers: [],
    recipe: {
      created_at: 0,
      id: 0,
      name: '',
      recipe_direction_durations: [],
      recipe_direction_durations_aggregate: {
        nodes: [],
      },
      recipe_directions: [],
      recipe_directions_aggregate: {
        nodes: [],
      },
      recipe_ingredient_groups: [],
      recipe_ingredient_groups_aggregate: {
        nodes: [],
      },
      recipe_tags: [],
      recipe_tags_aggregate: {
        nodes: [],
      },
      source: '',
      updated_at: 0,
      visible: false
    }
  },
})

export const recipeInvalidatedState = selector({
  key: 'recipeInvalidatedState',
  get: ({ get }) => {
    return get(recipeViewerState).invalidated;
  }
});

export const focusedDirectionTimestampState = selector({
  key: 'focusedDirectionTimestampState',
  get: ({ get }) => {
    return get(recipeViewerState).focusedDirectionTimestamp;
  }
});

export const reportedTimestampState = selector({
  key: 'reportedTimestampState',
  get: ({ get }) => {
    return get(recipeViewerState).reportedTimestamp;
  }
});
