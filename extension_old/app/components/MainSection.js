import React, { Component, PropTypes } from 'react';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import style from './MainSection.css';
import { IMAGE_INPUT_RENDER, NO_RENDER, recipeProperties, RENDER_TYPE, TEXT_AREA_RENDER, TEXT_INPUT_RENDER } from '../constants/RecipeProperties';
import { toTitleCase } from '../utils/text';

function tell(message, data) {
  var data = data || {};
  chrome.tabs.getSelected(null, (tab) => {
    if (!tab) return;
    chrome.tabs.sendMessage(tab.id, {
      message,
      data
    });
  });
}

export default class MainSection extends Component {

  static propTypes = {
    recipe: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleClearCompleted = () => {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  };

  handleShow = (filter) => {
    this.setState({ filter });
  };

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      return (
        <input
          className={style.toggleAll}
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={actions.completeAll}
        />
      );
    }
  }

  renderFooter(completedCount) {
  }

  changeInput(property) {
    const { actions } = this.props;

    try {
      tell('settingProperty', property);
    } catch (e) {
      console.log(e);
    }

    actions.selectingProperty(property);
  }

  renderTextInput(name, value) {
    return (
      <input type="text" name={name} value={value} />
    );
  }

  renderImageInput(name, value) {
    return (
      <img src={value} onClick={() => this.changeInput(name)} />
    );
  }

  handleChange(event) {
    this.props.actions.objectsSelected({
      objects: event.target.value.split('\n'),
      selector: null,
    });
  }

  renderTextArea(name, value) {
    return (
      <textarea name={name} value={value} onChange={this.handleChange.bind(this)} />
    );
  }

  renderNoRender(name, value) {
    return (
      <span>{value}</span>
    );
  }

  renderInputComponents(currentProperty, recipe) {
    const renderLookup = {
      [TEXT_INPUT_RENDER]: this.renderTextInput.bind(this),
      [IMAGE_INPUT_RENDER]: this.renderImageInput.bind(this),
      [TEXT_AREA_RENDER]: this.renderTextArea.bind(this),
      [NO_RENDER]: this.renderNoRender.bind(this)
    };
    return (
      Object.keys(recipeProperties).map((prop) => {
        const propRenderType = recipeProperties[prop][RENDER_TYPE];
        const renderFunc = renderLookup[propRenderType];
        const isSelected = currentProperty === prop;
        return (
          <p>
            <label style={isSelected ? { background: 'red' } : {}} onClick={() => this.changeInput(prop)}>{toTitleCase(prop)}</label>
            <div>
              {renderFunc(prop, recipe && recipe[prop] && recipe[prop].objects ? recipe[prop].objects.join('\n') : '')}
            </div>
          </p>
        );
      })
    );
  }

  saveRecipe(recipe) {
    console.log(recipe);

    // TODO include selector for recipe props
    const formattedRecipe = Object.keys(recipe.recipe).reduce((formatRecipe, propName) => {
      const prop = recipe.recipe[propName];
      if (typeof prop === 'string') {
        return {
          ...formatRecipe,
          [propName]: prop
        };
      }
      return {
        ...formatRecipe,
        [propName]: prop.objects
      };
    }, {});
    const propertySelectors = Object.keys(recipe.recipe)
      .filter(p => typeof recipe.recipe[p] === 'object' && recipe.recipe[p].selector !== null)
      .map(propName => ({
        propertyName: propName,
        selector: recipe.recipe[propName].selector,
        hasMultiple: !!recipe.recipe[propName].hasMultiple
      }));

    const body = {
      block_input: {
        ...formattedRecipe,
        extractionMetadata: {
          propertySelectors,
          deletedObjects: recipe.deletedObjects
        }
      },
      backpack: {},
      import_path: 'function',
      function_name: 'handler',
      command: 'python3',
      handler: '/var/runtime/handlers/handler.py',
      cwd: '/var/function'
    };
    fetch('https://tsnq0rs2c1.execute-api.us-west-2.amazonaws.com/prod/recipe', {
      method: 'POST',
      mode: 'no-cors',
      headers: {},
      body: JSON.stringify(body)
    });
  }

  runScraperScript(scraperScript) {
    try {
      tell('runScraperScript', scraperScript);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { recipe } = this.props;
    const { scraperScript } = this.state;

    const scrapedRecipes = recipe.scrapedRecipes || [];

    const changeScraperScript = (e) => {
      this.setState({ scraperScript: e.target.value });
    };

    const saveRecipe = () => {
      this.saveRecipe(recipe);
    };

    const runScraperScript = () => {
      this.runScraperScript(scraperScript);
    };

    const saveScrapedRecipes = async () => {
      await fetch('http://localhost:5000/recipe/save', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(scrapedRecipes)
      });
    };

    return (
      <section className={style.main}>
        <form>
          <div style={{ padding: '10px' }}>
            {this.renderInputComponents(recipe.currentProperty, recipe.recipe)}
          </div>
          <button type="button" onClick={saveRecipe}>Save</button>
          <h5>Deleted Objects</h5>
          {recipe.deletedObjects &&
            <ul>
              {recipe.deletedObjects.map(s => (
                <li>{s}</li>
              ))}
            </ul>
          }
          <div>
            <h5>Scraper Script</h5>
            <textarea name="scraper-script" value={scraperScript} onChange={changeScraperScript} />
            <br />
            <button type="button" onClick={runScraperScript}>Run</button>
            <button type="button" onClick={saveScrapedRecipes}>Save Recipes</button>
          </div>
          <div style={{ padding: '10px' }}>
            {scrapedRecipes.map(r => (
              <div>
                <span>{r.name}</span>
                <h5>Ingredients</h5>
                <ul>
                  {r.ingredients.map(i => (
                    <li>{i}</li>
                  ))}
                </ul>
                <h5>Directions</h5>
                <ol>
                  {r.directions.map(s => (
                    <li>{s}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </form>
      </section>
    );
  }
}
