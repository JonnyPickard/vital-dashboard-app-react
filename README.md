# Vital Frontend Task

## About

Vital frontend tech test. To enable Clients to order Biomarker-tests for Users.

See [Task Spec](./TASK.md) for more information.

## Rough Plan

### List All Available Biomarker-tests

- API GET req `/v3/lab_tests`.
  - No pagination required.
- List all results.
- Search Filter functionality (Fuzzy search via name?).
- List results should have an `Add To Panel` button.

### Panel Creation (Group of Biomarker-test)

- Client side Data structure for panel data.
- Design Panels.
  - Name.
  - Biomarker collection.
  - Sampling method ("at home test kit").

### List Panels

- Design a list of Panels (Can potentially reuse most of the Biomarker-test lists?).

## Testing

Unit tests are set up with [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

```sh
  # run unit tests

  npm test
```
