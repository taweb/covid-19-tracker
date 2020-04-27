# Covid-19 Statistics App

## Summary of App

- This app uses makes use of the publicly available [Covid-19 API](https://covid19api.com/) to display key statistics by country during the ongoing Coronavirus pandemic.
- The app is built as an SPA using [Vue.js](https://vuejs.org/), making use of core libraries [Vuex](https://vuex.vuejs.org/) for state management and [Vue Router](https://router.vuejs.org/) for routing. 
- The [Chart.js](https://www.chartjs.org/) library is used to display data in a visual way on country detail view.
- [Tailwind CSS](https://tailwindcss.com/) was used for styling the app.

## Technologies

### Vue.js & Core Libraries

- This project allowed me to learn and practice making a Vue.js SPA having previously had experience with React.js + Redux. Although the syntax is different, the fundamental principles are the same, such as the idea of downwards flow of data from parent to child components via props, and component lifecycle methods etc.
- Vuex is the core state management library which Vue uses, and again there are similarities with Redux. Both libraries are inspired by Flux Architecture designed by Facebook, and aim to establish a single source of truth for application state, with any changes to state made in a predictable manner. A key difference is that in the case of Vuex the state is designed to be mutated by committing mutations, whereas in the case of Redux changes to state should be immutable (return a new state object after every update).
- Vue Router is used to control routing in the app, such as redirecting wildcard routes to the 404 page and using the included global and per-route navigation guards to perform tasks before executing route requests.

### Charting

Chart.js is used to display various datasets (eg. total deaths, daily deaths) on a line graph on the country detail view. It has good documentation and has built in animations and useful functionality like the ability to hide/show individual datasets on the graph.

### Styling


Styling was done using the Tailwind CSS framework, which uses a utility first approach to styling by providing low level classes. I had not used this approach for styling before and I was sceptical at first, largely due to how HTML starts to look cluttered when lots of utility classes are applied. However having used it, there are some things I really like about it:
- It works well with components - can apply utility classes in one place for reusable parts of the app.
- Base styles applied are very minimal and unopinionated. It was easy to scaffold a custom design without having to override lots of styles.
- It is mobile first and there is an easy syntax for adding classes to take effect at different screen sizes
- It is easy to purge out unused classes on build to reduce file size

## Possible Advancements

- Ability to select another country in the detail view as a comparison.
- At the moment the graph shows data from the date of the first confirmed case to the present. It would be good to be able to search by a user specified time frame or from the first death etc.

## Running the App Locally

### Clone the Repo

### Install Dependencies 
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```
