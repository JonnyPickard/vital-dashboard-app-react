import { Heading, Button, Divider, Box } from "@chakra-ui/react";

const { VITE_VITAL_LABS_API_KEY } = import.meta.env;

export const APP_NAME = "Vital";

function fetchTestableBiomarkers(apiKey: string) {
  fetch("/api", {
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "x-vital-api-key": apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json().then(console.log))
    .catch(console.error);
}

function App() {
  return (
    <>
      <Heading as="h2" fontSize="2xl" fontWeight="semibold">
        Create Panel
      </Heading>

      <Divider />

      <Box padding="10">
        <Button
          onClick={() => fetchTestableBiomarkers(VITE_VITAL_LABS_API_KEY)}
        >
          Fetch Biomarkers List
        </Button>
      </Box>
    </>
  );
}

export default App;
