import * as types from '../constants/ActionTypes';
import { recipeProperties, RENDER_TYPE, TEXT_INPUT_RENDER } from '../constants/RecipeProperties';

export function selectingProperty(property) {
  return { type: types.SET_CURRENT_PROPERTY, name: property };
}

export function setSource(source) {
  return { type: types.SET_SOURCE, source: source};
}

export function objectsSelected(objectConfig) {
  const recipeProps = recipeProperties[objectConfig.propertyName];
  if (recipeProps) {
    const renderType = recipeProps[RENDER_TYPE];
    if (renderType === TEXT_INPUT_RENDER) {
      objectConfig.objects = [objectConfig.objects.join(" ")]
    }
  }
  const propertyConfig = {
    propertyName: objectConfig.propertyName,
    selector: objectConfig.selector,
    objects: objectConfig.objects,
    hasMultiple: objectConfig.hasMultiple
  };
  return { type: types.OBJECTS_SELECTED, values: {
    propertyConfig: propertyConfig,
    deletedObjects: objectConfig.deletedObjects,
  }};
}

export function nextProperty() {
  return { type: types.NEXT_PROPERTY };
}

export function recipesScraped(recipes) {
  return { type: types.RECIPES_SCRAPED, recipes };
}
