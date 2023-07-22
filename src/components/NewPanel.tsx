import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Select,
} from "@chakra-ui/react";
import { useStateMachine } from "little-state-machine";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { updatePanelsAction } from "../services/createNewPanel";
import { fetchAllLabTests } from "../services/fetchAllLabTests";
import type { LabTestsResponseData } from "../types/LabTestsResponseData";
import type { Panel } from "../types/Panel";
import { BiomarkersTable } from "./BiomarkersTable";
import { PageHeader } from "./PageHeader";

export const NEW_PANEL_NAME = "Create Panel";
export const NEW_PANEL_SUBTITLE =
  "Create a new panel of lab tests available for ordering to your team.";

const preventEnterSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};

export function NewPanel() {
  const { actions } = useStateMachine({ updatePanelsAction });

  const [labTestsList, setLabTestsList] = useState<
    LabTestsResponseData["markers"] | []
  >([]);

  const methods = useForm<Panel>();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  const onSubmit = (data: Panel) => {
    actions.updatePanelsAction(data);
  };

  // TODO: Switch out for React-Query
  // TODO: Add states for Loading + Failure to load
  useEffect(() => {
    async function fetchData() {
      try {
        const labTests = await fetchAllLabTests();

        if (labTests && labTests.markers) {
          setLabTestsList(labTests.markers);
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => preventEnterSubmit(e)}
          >
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
              <BiomarkersTable biomarkersList={labTestsList} />
            </FormControl>

            {/* TODO:
              - Close resets form to add more
                - Might be easiest with routing?
              - Go to panels list CTA
            */}
            <Popover isOpen={isSubmitSuccessful}>
              <PopoverTrigger>
                <Button type="submit" marginBottom="4">
                  Save Panel
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader
                  display="flex"
                  justifyContent="center"
                  fontWeight="semibold"
                >
                  Panel Saved!
                </PopoverHeader>
                <PopoverArrow />
                <PopoverBody display="flex" justifyContent="center">
                  {/* TODO: For now just link to reset page? */}
                  <Button colorScheme="green" onClick={() => reset()}>
                    Create Another?
                  </Button>
                </PopoverBody>
                <PopoverFooter display="flex" justifyContent="center">
                  <Link>Go to Panels?</Link>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
}
