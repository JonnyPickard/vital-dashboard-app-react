import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useStateMachine } from "little-state-machine";
import { FormProvider, useForm } from "react-hook-form";
import { Link as ReactRouterLink } from "react-router-dom";

import { COLLECTION_METHODS, NEW_PANEL } from "../constants";
import { updatePanelsAction } from "../services/createNewPanel";
import { useLabTests } from "../services/useLabTests";
import type { Panel } from "../types/Panel";
import { BiomarkersTable } from "./BiomarkersTable";
import { PageHeader } from "./PageHeader";

const preventEnterSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};

export function NewPanel() {
  const { data, isSuccess, isError } = useLabTests();

  const { actions } = useStateMachine({ updatePanelsAction });

  const methods = useForm<Panel>();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  const onSubmit = (data: Panel) => {
    // Prevent multiple submits of the same valid form
    //  isSubmitSuccessful = true after onSubmit has completed once
    if (!isSubmitSuccessful) {
      actions.updatePanelsAction(data);
    }
  };

  return (
    <Box padding="4">
      <PageHeader
        headingText={NEW_PANEL.NAME}
        subtitleText={NEW_PANEL.SUBTITLE}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => preventEnterSubmit(e)}
        >
          <FormControl
            marginBottom="6"
            isInvalid={Boolean(errors.panelName)}
            isReadOnly={isSubmitSuccessful}
          >
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
            isReadOnly={isSubmitSuccessful}
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
              <option value={COLLECTION_METHODS.TEST_KIT}>Test Kit</option>
              <option value={COLLECTION_METHODS.AT_HOME_PHLEBOTOMY}>
                At Home Phlebotomy
              </option>
            </Select>
          </FormControl>

          <FormControl
            marginBottom="6"
            isInvalid={Boolean(errors.biomarkers)}
            isReadOnly={isSubmitSuccessful}
          >
            <FormLabel>Available Lab Tests</FormLabel>
            <FormHelperText marginBottom="4">
              The lab tests you would like to order.
            </FormHelperText>
            <FormErrorMessage marginBottom="3">
              {errors?.biomarkers && errors?.biomarkers?.message?.toString()}
            </FormErrorMessage>

            {isError ? (
              <Alert
                status="warning"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                padding="3"
                borderRadius="md"
              >
                <AlertIcon />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  There was a problem requesting lab tests.
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  Please try refreshing the page.
                </AlertDescription>
              </Alert>
            ) : (
              <Skeleton borderRadius="md" isLoaded={isSuccess}>
                <BiomarkersTable biomarkersList={data?.markers} />
              </Skeleton>
            )}
          </FormControl>

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
                Panel Saved
              </PopoverHeader>
              <PopoverArrow />
              <PopoverBody
                display="flex"
                justifyContent="center"
                alignItems="center"
                padding="3"
              >
                <Text fontSize="sm" fontWeight="medium" textAlign="center">
                  New Panel '{getValues("panelName")}' was created sucessfully!
                </Text>
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="center">
                <SimpleGrid columns={2} spacing="4">
                  <Link
                    fontWeight="medium"
                    color="blue.600"
                    as={ReactRouterLink}
                    to="/panels/create"
                    reloadDocument
                  >
                    Create More?
                  </Link>
                  <Link
                    fontWeight="medium"
                    color="blue.600"
                    as={ReactRouterLink}
                    to="/panels"
                  >
                    View Panels?
                  </Link>
                </SimpleGrid>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </form>
      </FormProvider>
    </Box>
  );
}
