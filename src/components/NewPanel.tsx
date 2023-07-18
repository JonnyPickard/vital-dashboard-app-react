import { useState, useEffect } from "react";
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

  // TODO: Switch out for React-Query
  // TODO: Add states for Loading + Failure to load
  useEffect(() => {
    async function fetchData() {
      try {
        const testableBiomarkers = await fetchTestableBiomarkers();

        if (testableBiomarkers && testableBiomarkers.markers) {
          setTestableBiomarkersList(testableBiomarkers.markers);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <Heading as="h2" fontSize="2xl" fontWeight="semibold">
        {NEW_PANEL_NAME}
      </Heading>

      <Divider />

      <Box padding="10">
        <UnorderedList>
          {testableBiomarkersList.map((marker) => (
            <ListItem key={marker.id}>{marker.name}</ListItem>
          ))}
        </UnorderedList>

        <Button
          onClick={() => {
            console.log("clicked");
          }}
        >
          Save Panel
        </Button>
      </Box>
    </>
  );
}

export default NewPanel;
