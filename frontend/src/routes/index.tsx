import React from 'react';
import {DisplayLarge} from "baseui/typography";
import {Link} from "react-router-dom";

export const Home = () => {
  return (
    <>
      <DisplayLarge>hello!</DisplayLarge>
      <Link to="/recipe/save">Save Recipe</Link>
    </>
  );
};
