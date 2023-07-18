import { Heading, Divider, Flex, Text } from "@chakra-ui/react";

interface PageHeaderProps {
  headingText: string;
  subtitleText: string;
}

export function PageHeader({ headingText, subtitleText }: PageHeaderProps) {
  return (
    <Flex direction="column" align="start" marginBottom="5">
      <Heading as="h2" fontSize="2xl" fontWeight="semibold">
        {headingText}
      </Heading>
      <Text marginTop="2" fontSize="sm" fontWeight="medium" color="text.400">
        {subtitleText}
      </Text>

      <Divider marginTop="3 " />
    </Flex>
  );
}
