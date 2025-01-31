# Voice123 Search App Prototype

This is a prototype application test for searching voice actors based on the provided requirements. The app is built with Vue.js (with Vuetify for UI components), Vuex for state management, and Jest for unit testing.
Since the main platform for Voice123 was built using Vue.js, I have chosen Vue.js for building this test task.

## Features

1. **Search Input Field & Button**
   - A search input field is provided where users can enter a query.
   - The query is executed either when the user presses the Enter key or clicks the "Search" button.

2. **Results Display**
   For every result, the following information is shown:
   - **Voice Actor Name**  
     - Displayed as a clickable link.
     - Opens in a new tab/window.
     - The link follows the structure: `https://voice123.com/{username}`
   - **Voice Actor Profile Picture**
   - **Matching Text Paragraph in details of the user**  
     - The first paragraph (name, summary, details or other information) that contains the search text.
     - The matched text is highlighted for easy identification.
   - **Audio Player with its title**  
     - An audio player is provided for listening to the relevant sample URL and the sample URL is the first element of the samples gotten after API hit. `https://voice123.com/api/providers/search/{username}?service=voice_over`
     - Some audio files are what I can't access on my side, so they are unable to be run.

3. **Results Pagination**
   - The results page includes a paginator component.
   - Users can navigate between pages of results.

## Prerequisites

- **Node.js** (v16 or later recommended)
- **npm** (v6 or later)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dmark1029/voice123-test.git
   cd voice123-test

2. **Install the dependencies:**

    ```bash

    npm install --legacy-peer-deps

3. **Run the project:**

    ```bash

    npm run serve

4. **Build the project:**

    ```bash

    npm run build

5. **Test the project**

    ```bash

    npm run test:unit