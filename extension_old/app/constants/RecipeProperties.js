export const RECIPE_NAME = 'name';
export const RECIPE_DESCRIPTION = 'description';
export const RECIPE_IMAGE = 'image';
export const RECIPE_INGREDIENTS = 'ingredients';
export const RECIPE_DIRECTIONS = 'directions';
export const RECIPE_TAGS = 'tags';
export const RECIPE_SOURCE = 'source';

export const RENDER_TYPE = 'renderType';

export const TEXT_INPUT_RENDER = 'textInput'
export const IMAGE_INPUT_RENDER = 'imageInput'
export const TEXT_AREA_RENDER = 'textAreaInput'
export const NO_RENDER = 'noRender'

export const recipeProperties = {
  [RECIPE_NAME]: {
    [RENDER_TYPE]: TEXT_INPUT_RENDER
  },
  [RECIPE_DESCRIPTION]: {
    [RENDER_TYPE]: TEXT_AREA_RENDER
  },
  [RECIPE_IMAGE]: {
    [RENDER_TYPE]: IMAGE_INPUT_RENDER
  },
  [RECIPE_INGREDIENTS]: {
    [RENDER_TYPE]: TEXT_AREA_RENDER
  },
  [RECIPE_DIRECTIONS]: {
    [RENDER_TYPE]: TEXT_AREA_RENDER
  },
  [RECIPE_TAGS]: {
    [RENDER_TYPE]: TEXT_AREA_RENDER 
  },
  [RECIPE_SOURCE]: {
    [RENDER_TYPE]: NO_RENDER
  }
}
