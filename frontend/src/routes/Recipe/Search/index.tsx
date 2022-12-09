import React, {useState} from 'react';
import {Input} from "baseui/input";
import {RecipeList} from "./RecipeList";
import {useStyletron} from "baseui";
import {Button} from 'baseui/button';

export const Search = () => {
  const [search, setSearch] = useState('');

  // TODO (cthompson) figure out why input box flashes when entering in text
  const [doSearch, setDoSearch] = useState('');
  const [css, theme] = useStyletron();

  return (
    <div>
      <div className={css({display: 'flex'})}>
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="recipe name"
          autoFocus
        />
        <Button onClick={() => setDoSearch(search)}>Search</Button>
      </div>
      <RecipeList search={doSearch} />
    </div>
  );
};
