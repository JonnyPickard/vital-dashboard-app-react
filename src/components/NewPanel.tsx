import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Box,
  Input,
  Select,
  UnorderedList,
  ListItem,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import { fetchTestableBiomarkers } from "../services/fetchTestableBiomarkers";
import { PageHeader } from "./PageHeader";

import type { LabsResponseData } from "../types/labs-response-data";

export const NEW_PANEL_NAME = "Create Panel";
export const NEW_PANEL_SUBTITLE =
  "Create a new panel of lab tests available for ordering to your team.";

type FormValues = {
  panelName: string;
  collectionMethod: string;
};

export function NewPanel() {
  const [testableBiomarkersList, setTestableBiomarkersList] = useState<
    LabsResponseData["markers"] | []
  >([]);

  const {
    handleSubmit,
    register,
    formState: { errors /* isSubmitting */ },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("errors", errors);
    console.log("data", data);
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl marginBottom="4" isInvalid={Boolean(errors.panelName)}>
            <FormErrorMessage>
              {errors.panelName && errors.panelName.message}
            </FormErrorMessage>
            <FormLabel>Panel Name</FormLabel>
            <Input
              type="text"
              {...register("panelName", {
                required: "Panel Name is required.",
                minLength: {
                  value: 4,
                  message: "Panel Name must be at least 4 characters.",
                },
              })}
            />
            <FormHelperText>
              What you would like to call the new Panel.
            </FormHelperText>
          </FormControl>

          <FormControl
            marginBottom="4"
            isInvalid={Boolean(errors.collectionMethod)}
          >
            <FormErrorMessage>
              {errors.collectionMethod && errors.collectionMethod.message}
            </FormErrorMessage>
            <FormLabel>Collection Method</FormLabel>
            <Select
              placeholder="Select option"
              {...register("collectionMethod", {
                required: "Collection Method is required.",
              })}
            >
              <option value="test-kit">Test Kit</option>
              <option value="at-home-phlebotomy">At Home Phlebotomy</option>
            </Select>
            <FormHelperText>
              Which test collection methodology you would like to use for the
              Panel.
            </FormHelperText>
          </FormControl>

          <Button type="submit" marginBottom="4">
            Save Panel
          </Button>
        </form>

        <TableContainer display="flex" borderRadius="10">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>NAME</Th>
                <Th>LAB</Th>
                <Th>TEST CODE</Th>
                <Th isNumeric>PRICE</Th>
              </Tr>
            </Thead>
            <Tbody>
              {testableBiomarkersList.map((marker) => {
                return (
                  <Tr key={marker.id}>
                    <Td>{marker.name}</Td>
                    <Td>Labcorp ({marker.lab_id})</Td>
                    <Td>{marker.provider_id}</Td>
                    <Td isNumeric>{marker.price}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
