import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { fetchTestableBiomarkers } from "../services/fetchTestableBiomarkers";
import type { LabTestsResponseData } from "../types/lab-tests-response-data";
import { BiomarkersTable } from "./BiomarkersTable";
import { PageHeader } from "./PageHeader";
import { createNewPanel } from "../services/createNewPanel";

export const NEW_PANEL_NAME = "Create Panel";
export const NEW_PANEL_SUBTITLE =
  "Create a new panel of lab tests available for ordering to your team.";

export type NewPanelFormValues = {
  panelName: string;
  collectionMethod: string;
  biomarkers: { [name: string]: boolean };
};

export function NewPanel() {
  const [testableBiomarkersList, setTestableBiomarkersList] = useState<
    LabTestsResponseData["markers"] | []
  >([]);

  const methods = useForm<NewPanelFormValues>();

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = methods;

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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(createNewPanel)}>
            <FormControl marginBottom="6" isInvalid={Boolean(errors.panelName)}>
              <FormLabel>Panel Name</FormLabel>
              <FormHelperText marginBottom="4">
                What you would like to call the Panel.
              </FormHelperText>
              <FormErrorMessage marginBottom="3">
                {errors.panelName && errors.panelName.message}
              </FormErrorMessage>
              <Input
                placeholder="e.g. Lipid Panel"
                type="text"
                {...register("panelName", {
                  required: "Panel Name is required.",
                  minLength: {
                    value: 4,
                    message: "Panel Name must be at least 4 characters.",
                  },
                })}
              />
            </FormControl>

            <FormControl
              marginBottom="6"
              isInvalid={Boolean(errors.collectionMethod)}
            >
              <FormLabel>Collection Method</FormLabel>
              <FormHelperText marginBottom="4">
                The test collection methodology you want to use.
              </FormHelperText>
              <FormErrorMessage marginBottom="3">
                {errors.collectionMethod && errors.collectionMethod.message}
              </FormErrorMessage>
              <Select
                placeholder="Select option"
                {...register("collectionMethod", {
                  required: "Collection Method is required.",
                })}
              >
                <option value="test-kit">Test Kit</option>
                <option value="at-home-phlebotomy">At Home Phlebotomy</option>
              </Select>
            </FormControl>

            <FormControl
              marginBottom="6"
              isInvalid={Boolean(errors.biomarkers)}
            >
              <FormLabel>Available Lab Tests</FormLabel>
              <FormHelperText marginBottom="4">
                The lab tests you would like to order.
              </FormHelperText>
              <FormErrorMessage marginBottom="3">
                {errors?.biomarkers && errors?.biomarkers?.message?.toString()}
              </FormErrorMessage>
              <BiomarkersTable biomarkersList={testableBiomarkersList} />
            </FormControl>

            <Button type="submit" marginBottom="4">
              Save Panel
            </Button>
          </form>
        </FormProvider>
        {/* TODO: Remove this or add a Toggle for dev/ production */}
        <DevTool control={control} />
      </Box>
    </Box>
  );
}
