# Vital Frontend Task

## About

Vital frontend tech test. To enable Clients to order Biomarker-tests for Users.

See [Task Spec](./TASK.md) for more information.

> Note on git - I have left the commit history as is using merge commits so it's easier to understand my working process.

## Caveats

### General

As I could have carried on working on this (I still have plenty of ideas for [further improvements](#further-improvements)), I aimed to provide the most value in areas that don't currently exist.

I mainly chose to focus on how New Panel creation could work and didn't spend as much time remaking existing features like the 'Your Panels' list.

### Form Submit

Due to the lack of a new panel creation endpoint I have done the bare basics & used a [little-state-machine](https://www.npmjs.com/package/little-state-machine) client side store to save panels with the following shape:

```ts
type Panel = {
  panelName: string;
  collectionMethod: string;
  // Uses slug value at the moment
  biomarkers: string[];
};
```

**I made the following assumptions:**

- The biomarker slug would be adequate as an id for constructing the new panel.
- The back end would assign a unique ID + meta data etc.
- The enpoint would allow for duplicate panel names so didn't add validation for unique name.

Finally in order to view the saved panels list for the test I didn't use the `/v3/lab_tests/` endpoint or copy its data structure. This was mainly because trying to mimic the behavior of this not yet existing endpoint didn't seem like a good use of time.

## UX/ Designs

### Test Catalog Selectable Table

Table with radio buttons

- [React Example: Row Selection](https://tanstack.com/table/v8/docs/examples/react/row-selection)

Use a mobile first data table with sticky search/ filters at bottom

- [Mobile Tables](https://css-tricks.com/responsive-data-tables/)

## Usage

### Quickstart

```bash
# Install project dependencies

npm install
```

Vite on startup will look for a `.env.local` file in the root directory containing the following environment variables:

```bash
  VITE_VITAL_LABS_API_URL=https://api.sandbox.eu.tryvital.io/v3/lab_tests/markers
  VITE_VITAL_LABS_API_KEY='<Your EU Sandbox Key>'
```

See [Task Spec](./TASK.md) for information on how to generate API keys.

```bash
# Start the development server

npm run dev
```

### Testing

<!-- TODO More info on libraries -->

Unit tests are set up with [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

```bash
  # run unit tests

  npm test
```

## 3rd Party Libraries

### [Vite](https://vitejs.dev/)

JavaScript build tool (similar to Webpack) that leverages widely supported modern browser features like ES Modules to dramatically simplify and speed up the build & development processes.

**Reasoning**: Vite appears to be a lot faster and easier to use than Webpack with a lot less configuration required & much faster compilation speeds.

### [React-Query](https://www.npmjs.com/package/@tanstack/react-query)

Async state management & data fetching.

**Reasoning**: Has easy to use handlers for most of the different scenarios during data fetching e.g. retries, caching, request cancellation, pagination & infinite scroll.

### Chakra-UI

<!-- TODO -->

### React-Hook-Form

<!-- TODO -->

## Further Improvements
