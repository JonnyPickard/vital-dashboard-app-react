# Frontend Task

One of Vital’s product verticals is the [Lab Testing API](https://tryvital.io/testing). We allow our customers to run lab tests through three different collection modalities: via at home test kits sent to the users’ house, via walk-in phlebotomy draws at the lab, and via at-home phlebotomy services. We help our customers create custom lab tests and pick a modality that best suits their needs. The lab that will run the test is determined by the modality the customer will use to collect their samples (i.e. not all labs offer all modalities).

When ordering lab tests for users, customers need to select which lab tests are going to be run. Vital offers a wide range of different biomarkers that can be tested. Lab tests can include biomarkers related to allergies, hormones, metabolic health, stress, etc. Some biomarker examples are:

- Vitamin D
- Cortisol
- hsCRP
- Glucose
- Cholesterol

When a client has chosen which biomarkers they want to test for, we group the biomarkers into a panel. A panel has a few characteristics:

1. A name (e.g. “My Awesome Health Panel”).
2. The group of biomarkers being tested (e.g. the ones mentioned above).
3. The collection method for the sample (e.g. “dried blood spot”, “saliva”, “phlebotomy”. etc). As previously mentioned, the collection method is dependent on the lab that will run the test.

You can have a [look at our public API](https://docs.tryvital.io/api-reference/lab-testing/tests) to see how this look like. Currently we don’t offer the creation of panels - this is a manual process. A customer provides us a group of biomarkers and a name, and we create a panel for them. Please have a look at our [Dashboard](https://app.tryvital.io/) (free to access) to have a better feeling - this flow is under the “Lab Test API” menu.

The goal of the task is to allow a user to create panels themselves. The task has the following mandatory requirements:

1. List biomarkers.
   1. Use our biomarkers API as your data source [[Docs here](https://docs.tryvital.io/api-reference/lab-testing/biomarkers)].
   2. You will need an API Key for this, you can get one for free from our Dashboard’s Settings section.
2. Filter the list of biomarkers.
   1. The filtering is done locally (versus against the API).
3. Create a panel with a name, a set of biomarkers, and a collection method.
   1. For the purpose of this exercise, the collection method is independent of the lab (e.g. a dropdown is enough to select the collection method)
   2. When creating a panel, I should be able to add as many biomarkers I want.
   3. Once I am done with the panel, I should have a button to save it.
4. Once a panel is created, it should be possible to see a list of them.
   1. We currently don’t have an API to create panels, so these are managed client-side in memory for the purpose of this task.
5. The task should be done with React and Typescript.

**Things we expect:**

1. The project setup and running instructions. It should be easy for us to run your project locally. Please write those in a _`README.md`_ file.

**Things that are up to you:**

1. How the page / experience looks like.
2. Usage of other 3rd party libraries. Please list them on your _`README.md`_ file and explain why you use them.
3. How much time you want to spend on the task. If compromises are made, please document them alongside your reasoning.

**Things we will evaluate:**

1. Design sensibility and user experience.
2. Code quality.
3. Eye for detail regarding the unhappy paths (e.g. failing to fetch biomarkers).
4. Feedback regarding our API and docs.

**Delivering the project:**

You can deliver the project in two ways:

1. Send the project zipped to `careers@tryvital.io` with the title `<your name> - frontend task`.
2. Send us a Github Link.
