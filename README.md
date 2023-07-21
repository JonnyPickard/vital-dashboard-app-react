# Vital Frontend Task

## About

Vital frontend tech test. To enable Clients to order Biomarker-tests for Users.

See [Task Spec](./TASK.md) for more information.

> Note on git - I have left the commit history clean using merge commits so it's easier to understand my working process.

## Rough Plan

- Test Catalog + Panel list already exist so just focus on a Panel Creation page to add the most value.
- New Panel Form
  - Field 1.(done)
    - Name: Name
    - Component: Input
  - Field 2. (done)
    - Name: Collection Method
    - Component: Select
  - Field 3.
    - Name: Select Tests
    - Component: Test Catalog Table
      - w/ Search + Filters + Add to Panel CTA Button

## TODO

- Better Async Fetch For Biomarkers
- Form tests
- Searchable Table Of Biomarkers

- MVP todo
- Subit form data - save & view panel list

## UX/ Designs

### Test Catalog Selectable Table

Table with radio buttons

- [React Example: Row Selection](https://tanstack.com/table/v8/docs/examples/react/row-selection)

Use a mobile first data table with sticky search/ filters at bottom

- [Mobile Tables](https://css-tricks.com/responsive-data-tables/)

## Usage

### Testing

<!-- TODO More info on libraries -->

Unit tests are set up with [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

```sh
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
