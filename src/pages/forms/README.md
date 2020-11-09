# Creation Flow
The creation flow of the app consists of a collection of forms seperated across pages. The forms must be reusable through other parts of the application to prevent technical debt and code duplicates.

## How it works
Each form page has the same structure; A title, with at least 1 form below it. These forms must be saved when the user moves to another page. Saving data and fetching initial values is handled seperately by each form so we can use them elsewhere in the application without having to rewrite any query or mutation code. To signal that a form should save, one must pass the `shouldSubmit` property with a value of `true`.

## Creating a form page
To create a new form page, you must first be clear on which parts of the page will be seperate forms. Each part will be a seperate component.

Under `src/pages/forms` is a collection of form components. Create a new folder with a proper name for the form, and inside that folder create a new `.tsx` file that will contain the form code. This component must have `FormProps` as it props type.

In there, you can build the form using `LabelTextField`, `LabelTextAreaField` and `LabelSelectField` as input components. All ids given to these components must start with an identifier which serves to identify which form the values belong to. Since all values are saved in one large form object, each form is seperated from the other by a prefix on the id. For example, the id for firstname on the personalia form would look like `personalia.firstname`. The best idea might be to create a `wrapId(String)` function that will automatically prefix the id with the form's id, like so:
```TS
const FORM_ID = 'personalia'; // change this to reflect your form
const wrapId = (htmlId: String) => `${FORM_ID}.${htmlId}`;
```
Feel free to copy this directly into your form component.

### **Initial Values**
Normally, the initial values for a form would be set when the form is first rendered, but we can't do this since the content of the form changes when the user goes to a new page. Because of this, we have to hack our way around this. The solution is to use the `useEffect()` hook to run code when a certain value changes.

> The useEffect is a hook that takes in a function and an array. The function you put in is called everytime a value within the array gets changed. You can see it as a sort of "on change" listener for a variable.

First, create a query that makes a call to the backend to fetch the data you need to fill the form. Then, create a useEffect hook that listens for a change in the data received from the query. A query won't return a value instantly because it executes async.
```TS
const { data } = useGetPersonalia(); // this query depends on the form

useEffect(() => {
    if (!data) return; // if the data is faulty, don't do anything with it
    setValues({ // this changes the values in the form to whatever we give it
        // change "personalia" to the ID of your form,
        // as mentioned in "Initial Values"
        personalia: data?.personalia,
        ...values // this is to override our initial values with 
                  // anything that might have already been in the form
    });
}, [data]); // we want this to run when the data from our query changes
```

### **Saving Data**
The forms must save their data when the `shouldSubmit` property (from the component props) is set to `true`. This means we must react when this property changes, so for that we'll also use the `useEffect()` hook, and we'll listen for a change to `shouldSubmit`.

To actually save the data, we need to write a mutation. Once that's done, simply include the hook to the mutation in the component. We can call it in the `useEffect()` like so:
```TS
const [savePersonalia] = useSavePersonalia(); // this mutation depends on the form
useEffect(() => {
    if (!shouldSubmit) return;
    savePersonalia({
        variables: {
            // include your variables here, pulled from "values" (found in props)
        }
    })
}, [shouldSubmit]);
```
This way the save mutation will run by itself when the form should be saved. The values can be found in the values object (which comes in through the react props), under the form ID specified in "Getting Started".

### **Registering the Form**
To add the form to the create flow, open `src/pages/create/creation-framework.tsx`. In there you'll find an array called `pages`. This array represents the create flow. To create a new page, add a new object to the array. The `title` property is the name at the top of the page. The `parts` property is a collection of forms that should be listed on this page. To add a form to an existing page, just add the form component to the `parts` array of the page you want it to appear on. 