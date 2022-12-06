import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as RecipeActions from '../actions/recipe';
import style from './App.css';
import { recipeProperties } from '../constants/RecipeProperties';

function tell(message, data) {
  var data = data || {};
  chrome.tabs.getSelected(null, function (tab){
      if (!tab) return;
      chrome.tabs.sendMessage(tab.id, {
          message: message,
          data: data
      });
  });
};

@connect(
  state => ({
    recipe: state.recipe
  }),
  dispatch => ({
    actions: bindActionCreators(RecipeActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    recipe: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  changeInput(property) {
    const { actions } = this.props;

    try {
      tell('settingProperty', property)
    } catch(e) {
      console.log(e);
    }

    actions.selectingProperty(property);
  }

  async getExtractionMetadata(domain) {
    const query = `
    query GetSourceExtractionMetadata($domain: String = "") {
      recipes(where: {source: {_ilike: $domain}}) {
        extraction_metadata
      }
    }
    `;
    const headers = {
        "x-hasura-admin-secret": "password",
        "content-type": "application/json"
    }
    const body = {
        "query": query,
        "variables": {
          domain: `%${domain}%`
        }
    }
    const data = await fetch("https://food.vanderpot.net/v1/graphql", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    const recipe = data.data.recipes[0];
    if (recipe !== undefined) {
      const extractionMetadata = recipe.extraction_metadata;
      tell('selectPropertiesFromPage', extractionMetadata);
    }
  }

  async receiveMessage(event) {
    switch (event.data.type) {
      case 'contextMenuSelected':
        const url = event.data.data.source;
        this.props.actions.setSource(url);

        const parsedUrl = new URL(url);
        this.getExtractionMetadata(parsedUrl.hostname);

        this.changeInput(Object.keys(recipeProperties)[0]);
        break;
      case 'objectsSelected':
        this.props.actions.objectsSelected(event.data.data);
        break;
      case 'nextProperty':
        this.props.actions.nextProperty();
        break;
      case 'recipesScraped':
        this.props.actions.recipesScraped(event.data.data);
        break;
    }
  }

  componentDidMount() {
    window.addEventListener('message', this.receiveMessage.bind(this));
  }

  render() {
    const { recipe, actions } = this.props;

    return (
      <div className={style.normal}>
        <Header addTodo={actions.addTodo} />
        <MainSection recipe={recipe} actions={actions} />
      </div>
    );
  }
}
