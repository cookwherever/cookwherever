import * as ActionTypes from '../constants/ActionTypes';
import * as RecipeProperties from '../constants/RecipeProperties';

const initialState = [{
  currentProperty: '',
  deletedObjects: [],
  recipe: Object.keys(RecipeProperties.recipeProperties).reduce((state, prop) => ({
    ...state,
    [prop]: ''
  }), {}),
  scrapedRecipes: []
}];

const actionsMap = {
  [ActionTypes.SET_CURRENT_PROPERTY](state, action) {
    return {
      ...state,
      currentProperty: action.name
    };
  },
  [ActionTypes.SET_SOURCE](state, action) {
    console.log(action);
    return {
      ...state,
      recipe: Object.assign({}, state.recipe, {
        source: action.source
      })
    };
  },
  [ActionTypes.OBJECTS_SELECTED](state, action) {
    const propertyName = action.values.propertyConfig.propertyName;

    const propertyToSet = propertyName || state.currentProperty;
    if (propertyToSet === undefined) {
      return state;
    }

    const updatedDeletedObjects = action.values.deletedObjects ? { deletedObjects: action.values.deletedObjects } : {};

    return {
      ...state,
      recipe: Object.assign({}, state.recipe, {
        [propertyToSet]: action.values.propertyConfig
      }),
      ...updatedDeletedObjects
    };
  },
  [ActionTypes.NEXT_PROPERTY](state, action) {
    const props = Object.keys(RecipeProperties.recipeProperties);
    const currentIdx = props.indexOf(state.currentProperty);
    return {
      ...state,
      currentProperty: props[(currentIdx + 1) % props.length]
    };
  },
  [ActionTypes.RECIPES_SCRAPED](state, action) {
    return {
      ...state,
      scrapedRecipes: action.recipes
    };
  }
};

export default function recipe(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
