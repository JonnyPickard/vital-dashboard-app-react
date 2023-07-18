import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Flex,
  UnorderedList,
  ListItem,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import type { LabsResponseData } from "../types/labs-response-data";

import { fetchTestableBiomarkers } from "../services/fetchTestableBiomarkers";

import { PageHeader } from "./PageHeader";

export const NEW_PANEL_NAME = "Create Panel";
export const NEW_PANEL_SUBTITLE =
  "Create a new panel of lab tests available for ordering to your team.";

export function NewPanel() {
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
    <Box padding="4">
      <PageHeader
        headingText={NEW_PANEL_NAME}
        subtitleText={NEW_PANEL_SUBTITLE}
      />

      <Box padding="4">
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
    </Box>
  );
}
