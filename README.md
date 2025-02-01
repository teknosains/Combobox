## Usage

Use it inside your component like this

```jsx
<Dropdown
  options={options}
  usePortal
  alwaysOpen
  clearAll={false}
/>
```

### Props
- options: **string[]**. Your lists or options
- usePortal: **boolean**. Use as Portal or not
- alwaysOpen: **boolean**. The dropdown list will always open from the first click. Otherwise, it only opens when the input search is clicked / filled
- clearAll: **boolean**. If you want to have a clear / reset all features


### Examples

<img width="738" alt="Screenshot 2025-02-02 at 02 54 47" src="https://github.com/user-attachments/assets/4bbf04e5-5891-41f1-9e37-5810cf35a83d" />
<img width="738" alt="Screenshot 2025-02-02 at 02 55 12" src="https://github.com/user-attachments/assets/4182bfe9-713c-404e-b5ff-f6764cbae329" />
<img width="738" alt="Screenshot 2025-02-02 at 02 54 31" src="https://github.com/user-attachments/assets/cc1acb5b-a8ed-4660-ab06-1140f815a98d" />


## Tailwind Setup

https://v3.tailwindcss.com/docs/guides/create-react-app


## Combobox Libs

Im using Downshift. A set of primitives to build simple, flexible, WAI-ARIA compliant React autocomplete, combobox or select dropdown components.

https://github.com/downshift-js/downshift

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
