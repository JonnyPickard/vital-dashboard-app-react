# Vital Frontend Task

## About

Vital frontend tech test. To enable Clients to order Biomarker-tests for Users.

See [Task Spec](./TASK.md) for more information.

## Rough Plan 2

- Test Catalog + Panel list already exist so just focus on a Panel Creation page to add the most value.
- New Panel Form
  - Field 1.
    - Name: Name
    - Component: Input
  - Field 2.
    - Name: Collection Type
    - Component: Select
  - Field 3.
    - Name: Select Tests
    - Component: Test Catalog Table
      - w/ Search + Filters + Add to Panel CTA Button

## Rough Plan 1

### List All Available Biomarker-tests

#### Steps

- API GET req `/v3/lab_tests`.
  - No pagination required.
  - Need to setup a localhost server proxy to avoid cors issues.
- List all results (Virtualised Table?).
- Search Filter functionality (Fuzzy search via name?).
- Pill Button Filters For Labs?
- List results should have an `Add To Panel` button.

### Panel Creation (Group of Biomarker-test)

- Client side Data structure for panel data.
- Design Panels.
  - Name.
  - Biomarker collection.
  - Sampling method ("at home test kit").

### List Panels

- Design a list of Panels (Can potentially reuse most of the Biomarker-test lists?).

## Designs

Use a mobile first data table with sticky search/ filters at bottom

- [Mobile Tables](https://css-tricks.com/responsive-data-tables/)

## Usage

### Testing

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
