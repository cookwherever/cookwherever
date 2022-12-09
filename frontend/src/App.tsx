// src/AppRouter.tsx

import React from 'react';
import {RelayEnvironmentProvider} from 'react-relay/hooks';
import {RelayEnvironment} from './relay';
import {RecoilRoot} from 'recoil';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {BaseProvider, LightTheme} from 'baseui';
import {Routes} from "react-router";
import {Route} from "react-router-dom";
import {PageLayout} from "./routes/layout/PageLayout";
import {Home} from "./routes";
import {Search} from "./routes/Recipe/Search";
import {Save} from "./routes/Recipe/Save";
import {View} from "./routes/Recipe/View";

const engine = new Styletron();

export const App: React.FC = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <RecoilRoot>
        <StyletronProvider value={engine}>
          <BaseProvider theme={LightTheme}>
            <Routes>
              <Route path='/' element={<PageLayout />}>
                <Route index element={<Home />}/>
                <Route path='recipe'>
                  <Route path='search' element={<Search />} />
                  <Route path='save' element={<Save />} />
                  <Route path='view/:recipeId' element={<View />} />
                </Route>
              </Route>
            </Routes>
          </BaseProvider>
        </StyletronProvider>
      </RecoilRoot>
    </RelayEnvironmentProvider>
  );
};
