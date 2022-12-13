import {styled, useStyletron} from "baseui";
import {AppNavBar, NavItem} from "baseui/app-nav-bar";
import {Block} from "baseui/block";
import {Layer} from "baseui/layer";
import {Cell, Grid} from "baseui/layout-grid";
import React, {Suspense} from "react";
import {DisplaySmall} from "baseui/typography";
import {Spinner} from "baseui/spinner";
import {Outlet, useNavigate} from "react-router-dom";

const Centered = styled('div', {
  boxSizing: "border-box",
  width: "100vw",
  position: "fixed",
  top: "0",
  left: "0",
});

export const PageLayout = () => {
  const [css] = useStyletron();
  const navigate = useNavigate();

  const controlledNavItem = (
    label: string,
    route: string,
    overrides?: Partial<NavItem>,
  ): NavItem => ({
    label: label,
    // active: route === pathname,
    info: {
      route,
    },
    ...overrides,
  });

  const mainItems = [
    controlledNavItem("Save", "/recipe/save"),
    controlledNavItem("Search", "/recipe/search"),
  ];

  function handleUserItemSelect(item: NavItem) {
    if (item.info?.route) navigate(item.info.route);
  }

  function handleMainItemSelect(item: NavItem) {
    if (item.info?.route) navigate(item.info.route);
  }

  return (
    <React.Fragment>
      <Layer>
        <Centered>
          <AppNavBar
            title={
              <a
                href={"/"}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/');
                }}
                className={css({
                  userSelect: "none",
                  textDecoration: "inherit",
                  textColor: "inherit",
                })}
              >
                <DisplaySmall>Cook Wherever</DisplaySmall>
              </a>
            }
            mainItems={mainItems}
            onMainItemSelect={handleMainItemSelect}
            onUserItemSelect={handleUserItemSelect}
          />
        </Centered>
      </Layer>
      <Block height={["80px"]} backgroundColor="background" />
      <Grid>
        <Cell skip={[0, 1, 1]} span={[4, 6, 10]}>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </Cell>
      </Grid>
    </React.Fragment>
  );
};
