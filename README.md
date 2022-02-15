# A sample React application for editing a list of tasks

Concepts demonstrated in this example:
1. Keeping a main context which can be accessed by multiple components (no prop drilling)
2. Conditional rendering and logic inside components (the TaskModal)
3. Typescript used for defining all types
4. Filtering inside the TaskTable by keeping a new filteredTasks list
5. List of tasks is immutable, each update to the tasks are done using a Redux like behavior (without actually using types)
6. Firestore integration ready
7. useReducer integration ready

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
