import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Divider,
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

import {
  COLLECTION_METHODS,
  NEW_PANEL_FORM_TEXT as FORM_TEXT,
  NEW_PANEL,
} from "../../constants";
import { updatePanelsAction, useLabTests } from "../../services";
import type { Panel } from "../../types/Panel";
import { PageHeader } from "../Layout";
import { BiomarkersTable } from "./BiomarkersTable";
import { preventEnterSubmit, submitSuccessDescription } from "./utils";

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
            isDisabled={isSubmitSuccessful}
          >
            <FormLabel>{FORM_TEXT.INPUT_1_LABEL}</FormLabel>
            <FormHelperText marginBottom="4">
              {FORM_TEXT.INPUT_1_HELPER}
            </FormHelperText>
            <FormErrorMessage marginBottom="4">
              {errors.panelName && errors.panelName.message}
            </FormErrorMessage>
            <Input
              placeholder={FORM_TEXT.INPUT_1_PLACEHOLDER}
              type="text"
              {...register("panelName", {
                required: FORM_TEXT.INPUT_1_VALIDATION_REQUIRED,
                minLength: {
                  value: 4,
                  message: FORM_TEXT.INPUT_1_VALIDATION_MIN_LENGTH,
                },
              })}
            />
          </FormControl>

          <FormControl
            marginBottom="6"
            isInvalid={Boolean(errors.collectionMethod)}
            isDisabled={isSubmitSuccessful}
          >
            <FormLabel>{FORM_TEXT.SELECT_2_LABEL}</FormLabel>
            <FormHelperText marginBottom="4">
              {FORM_TEXT.SELECT_2_HELPER}
            </FormHelperText>
            <FormErrorMessage marginBottom="4">
              {errors.collectionMethod && errors.collectionMethod.message}
            </FormErrorMessage>
            <Select
              placeholder={FORM_TEXT.SELECT_2_PLACEHOLDER}
              {...register("collectionMethod", {
                required: FORM_TEXT.SELECT_2_VALIDATION_REQUIRED,
              })}
            >
              <option value={COLLECTION_METHODS.TEST_KIT}>
                {COLLECTION_METHODS.TEST_KIT_TITLE}
              </option>
              <option value={COLLECTION_METHODS.AT_HOME_PHLEBOTOMY}>
                {COLLECTION_METHODS.AT_HOME_PHLEBOTOMY_TITLE}
              </option>
            </Select>
          </FormControl>

          <FormControl
            marginBottom="6"
            isInvalid={Boolean(errors.biomarkers)}
            isDisabled={isSubmitSuccessful}
          >
            <FormLabel>{FORM_TEXT.TABLE_3_LABEL}</FormLabel>
            <FormHelperText marginBottom="4">
              {FORM_TEXT.TABLE_3_HELPER}
            </FormHelperText>
            <FormErrorMessage marginBottom="4">
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
                  {FORM_TEXT.TABLE_3_FETCH_ALERT_TITLE}
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  {FORM_TEXT.TABLE_3_FETCH_ALERT_DESCRIPTION}
                </AlertDescription>
              </Alert>
            ) : (
              <Skeleton borderRadius="md" isLoaded={isSuccess}>
                <BiomarkersTable biomarkersList={data?.markers} />
              </Skeleton>
            )}
          </FormControl>

          <Box>
            <Divider marginBottom="6" />
            <Popover placement="top">
              <PopoverTrigger>
                <Button type="submit" marginBottom="4" colorScheme="teal">
                  {FORM_TEXT.SUBMIT_BUTTON}
                </Button>
              </PopoverTrigger>
              <PopoverContent marginLeft="4">
                <PopoverHeader
                  display="flex"
                  justifyContent="center"
                  fontWeight="semibold"
                >
                  {FORM_TEXT.SUBMIT_SUCCESS_HEADER}
                </PopoverHeader>
                <PopoverArrow />
                <PopoverBody
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  padding="3"
                >
                  <Text fontSize="sm" fontWeight="medium" textAlign="center">
                    {submitSuccessDescription(getValues("panelName"))}
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
                      {FORM_TEXT.SUBMIT_SUCCESS_LINK_CREATE_MORE}
                    </Link>
                    <Link
                      fontWeight="medium"
                      color="blue.600"
                      as={ReactRouterLink}
                      to="/panels"
                    >
                      {FORM_TEXT.SUBMIT_SUCCESS_LINK_VIEW_PANELS}
                    </Link>
                  </SimpleGrid>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}
