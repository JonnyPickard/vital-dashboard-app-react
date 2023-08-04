import { Box, Divider, Link, List, ListItem } from "@chakra-ui/react";
import { Outlet, Link as ReactRouterLink } from "react-router-dom";

import { PanelIcon } from "../../assets/Icons";

export function Layout() {
  return (
    <Box>
      <Box as="nav" padding="4">
        <List marginBottom="4" display="flex" justifyContent="space-evenly">
          <ListItem>
            <Link
              display="flex"
              alignItems="center"
              as={ReactRouterLink}
              to="/panels/create"
            >
              <PanelIcon marginRight="3" /> Create Panel
            </Link>
          </ListItem>
          <ListItem>
            <Link
              display="flex"
              alignItems="center"
              as={ReactRouterLink}
              to="/panels"
            >
              <PanelIcon marginRight="3" /> Your Panels
            </Link>
          </ListItem>
        </List>
        <Divider />
      </Box>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </Box>
  );
}
