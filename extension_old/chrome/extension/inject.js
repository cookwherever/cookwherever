import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
import * as finder from './finder';

function getSelectionText() {
  let text = '';
  const activeEl = document.activeElement;
  const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  if (
    (activeElTagName == 'textarea') || (activeElTagName == 'input' &&
    /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
    (typeof activeEl.selectionStart === 'number')
  ) {
    text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
  } else if (window.getSelection) {
    text = window.getSelection().toString();
  }
  return text;
}

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectingRecipe: false,
      isVisible: false,
      contentURL: chrome.extension.getURL(`inject.html?protocol=${location.protocol}`),
      currentProperty: null,
      deletedObjects: []
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.capture.bind(this));
    document.addEventListener('message', this.handleMessage.bind(this));
    //document.addEventListener('click', this.capture.bind(this));
    document.onselectionchange = this.selectText;
    chrome.extension.onMessage.addListener(this.handleMessage.bind(this));
    //chrome.browserAction.onClicked.addListener(this.contextMenuClicked.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.capture);
    document.removeEventListener('message', this.handleMessage);
    //document.removeEventListener('click', this.capture);
    chrome.extension.onMessage.removeListener(this.handleMessage);
  }

  contextMenuClicked(event) {
    console.log(event);
    if (event.menuItemId === CONTEXT_MENU_ID) {
      this.setState({ isVisible: true });
    }
  }

  send(type, data) {
    if (this.container && this.container.contentWindow) {
      this.container.contentWindow.postMessage({ type, data }, '*');
    }
  }

  handleMessage(e) {
    // TODO check who is sending us data
    console.log(e);

    switch (e.message) {
      case 'runScraperScript':
        const script = e.data;
        const recipes = eval(script);
        this.send('recipesScraped', recipes);
        break;
      case 'settingProperty':
        this.setState({ currentProperty: e.data });
        break;
      case 'selectPropertiesFromPage':
        const props = e.data.propertySelectors;
        const elementsToRemove = e.data.deletedObjects;

        for (const i in elementsToRemove) {
          const elem = document.querySelector(elementsToRemove[i]);
          if (elem !== null) {
            elem.remove();
          }
        }

        for (const i in props) {
          const hasMultiple = props[i].hasMultiple;

          let elemArray = [];
          if (props[i].selector !== '') {
            const elem = document.querySelectorAll(props[i].selector);
            if (hasMultiple) {
              elemArray = Array.from(elem[0].children);
            } else {
              elemArray = Array.from(elem);
            }
          }

          console.log(elemArray.map(t => t.textContent));

          this.send('objectsSelected', {
            propertyName: props[i].propertyName,
            deletedObjects: elementsToRemove,
            selector: props[i].selector,
            objects: elemArray.map(t => t.textContent)
          });
        }
        break;
      case 'contextMenu':
        this.setState({ isVisible: true, collectingRecipe: true });
        this.send('contextMenuSelected', {
          source: window.location.href
        });
        break;
    }
  }

  capture(e) {
    if (!this.state.collectingRecipe) {
      return;
    }

    if (e.key === 'h') {
      this.setState({ isVisible: !this.state.isVisible });
      return;
    }

    if (!this.state.currentProperty) {
      return;
    }

    if (e.key === 'n') {
      this.send('nextProperty', {});
      return;
    }

    if (e.key === 'i') {
      const imgs = document.getElementsByTagName('img');
      for (let i = 0; i < imgs.length; i += 1) {
        imgs[i].style.display = 'none';
      }
      return;
    }

    if (e.key !== 'a' && e.key !== 'd') {
      return;
    }

    for (const i in this.$similarTargets) {
      if (typeof this.$similarTargets[i] !== 'object') {
        continue;
      }
      this.$similarTargets[i].style = this.$previousStyles[i];
    }

    function getInnermostHovered() { return [].slice.call(document.querySelectorAll(':hover')).pop(); }

    const nodeSelector = finder.finder(getInnermostHovered());

    console.log(nodeSelector);

    this.selector = nodeSelector;

    const elem = document.querySelector(nodeSelector);

    if (e.keyCode === 68) {
      elem.remove();
      this.setState({ deletedObjects: [
        ...this.state.deletedObjects,
        nodeSelector
      ] });
      return;
    }

    this.$target = elem;

    function findSimilarTargets(depth, elem) {
      if (depth === 5 || elem === null) {
        return {
          elems: [],
          selector: undefined
        };
      }

      for (const i in elem.classList) {
        const className = elem.classList[i];
        const elems = document.getElementsByClassName(className);
        if (elems.length > 1) {
          return {
            elems,
            selector: `.${className}`
          };
        }
      }

      if (nodeSelector.indexOf('nth-child') !== -1) {
        const similarTargets = elem.parentElement.children;
        if (similarTargets.length > 1) {
          const tagName = similarTargets[0].tagName;

          if (Array.from(similarTargets).every(e => e.tagName === tagName)) {
            return {
              elems: similarTargets,
              selector: undefined
            };
          }
        }
      }
      return findSimilarTargets(depth + 1, elem.parentElement);
    }

    let hasMultiple = false;
    this.$similarTargets = [this.$target];
    if (e.key === 'a') {
      const ret = findSimilarTargets(0, elem);
      if (ret.elems.length > 0) {
        this.$similarTargets = ret.elems;

        if (this.$similarTargets.length !== 0) {
          this.selector = finder.finder(this.$similarTargets[0].parentElement);
          hasMultiple = true;
        }

        if (ret.selector) {
          this.selector = ret.selector;
          hasMultiple = false;
        }
      }
    }

    console.log(this.$similarTargets);

    this.$previousStyles = [];
    for (const t of this.$similarTargets) {
      if (typeof t !== 'object') {
        continue;
      }
      t.style.backgroundColor = 'red';
      this.$previousStyles.push(t.style);
    }

    this.send('objectsSelected', {
      deletedObjects: this.state.deletedObjects,
      selector: this.selector,
      objects: Array.from(this.$similarTargets).map(t => t.textContent),
      hasMultiple
    });
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  selectText = () => {
    const selectedText = getSelectionText();
    this.send('objectsSelected', {
      deletedObjects: this.state.deletedObjects,
      selector: null,
      objects: selectedText.split('\n')
    });
  }

  render() {
    return (
      <div>
        <Dock
          position="right"
          dimMode="transparent"
          defaultSize={0.4}
          isVisible={this.state.isVisible}
        >
          <iframe
            ref={(e) => {
              this.container = e;
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
            frameBorder={0}
            allowTransparency="true"
            src={this.state.contentURL}
          />
        </Dock>
      </div>
    );
  }
}

window.addEventListener('load', () => {
  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  console.log('inside inject');
  render(<InjectApp />, injectDOM);
});
