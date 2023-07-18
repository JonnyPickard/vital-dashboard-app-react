import { useState } from "react";
import {
  Heading,
  Button,
  Divider,
  Box,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import type { LabsResponseData } from "../types/labs-response-data";

import { fetchTestableBiomarkers } from "../services/fetchTestableBiomarkers";
export const NEW_PANEL_NAME = "Create Panel";

function NewPanel() {
  const [testableBiomarkersList, setTestableBiomarkersList] = useState<
    LabsResponseData["markers"] | []
  >([]);

  return (
    <>
      <Heading as="h2" fontSize="2xl" fontWeight="semibold">
        {NEW_PANEL_NAME}
      </Heading>

      <Divider />

      <Box padding="10">
        <Button
          onClick={() => {
            fetchTestableBiomarkers()
              .then((response) => {
                if (response && response.markers) {
                  setTestableBiomarkersList(response.markers);
                }
              })
              .catch(console.error);
          }}
        >
          Fetch Biomarkers List
        </Button>
        <UnorderedList>
          {testableBiomarkersList.map((marker) => (
            <ListItem key={marker.id}>{marker.name}</ListItem>
          ))}
        </UnorderedList>
      </Box>
    </>
  );
}

export default NewPanel;
