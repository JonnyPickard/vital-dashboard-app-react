import { Heading, Button, Divider, Box } from "@chakra-ui/react";

import { fetchTestableBiomarkers } from "../services/fetchTestableBiomarkers";

export const NEW_PANEL_NAME = "Create Panel";

function NewPanel() {
  return (
    <>
      <Heading as="h2" fontSize="2xl" fontWeight="semibold">
        {NEW_PANEL_NAME}
      </Heading>

      <Divider />

      <Box padding="10">
        <Button onClick={() => fetchTestableBiomarkers()}>
          Fetch Biomarkers List
        </Button>
      </Box>
    </>
  );
}

export default NewPanel;
