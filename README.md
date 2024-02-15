# Weather

An Angular 17 application used for fetching and displaying weather in Maribor, Slovenija


# Project structure and architecture

## Angular
Due to the size of application and requirements, the project follows a simple folder structure, with each building schematic (services, components, pipes, etc.) 
having their own folders.

### State management

Again, due to the size and complexity of the application, there was no need for introducing a state management library or some other third
party solution.

The application follows a pretty basic `[Behavior]Subject`->exposed `Observable` pattern to track data.

All of the data states (Loading, Loaded, Error, etc.) are handled by the services themselves, and the data just gets passed on to components 
for displaying. 

In case of an action which needs to happen (ie. data reload), the component will just propagate that action to the service, and then the service
will handle all the rest.

No manual subscribes to the data streams is present, to minimize the risk of memory leaks and improper disposals of said streams.

### Routing
Since all the functionality is on one page, Angular router is not used. Only one component is rendered inside of `RouterOutlet`, and
that is `DefaultLayoutComponent`, which holds the weather related components.


### Internationalization

The application uses the `ngx-translate` library for translations of manually created strings.

For translations of weather codes and descriptions, `OpenWeatherMap` handles that from their side when a `lang` parameter is provided.



## Code reliability
One of the main focuses for this project is ensuring code reliability and quality through small iterations or big changes.

To accomplish that, the project uses a combination of unit tests, linters, formatters and commit hooks,
ensuring that only clean code ends up on the public repository. (Notice how I didn't say **bugless** :D) 


### Unit tests
For unit testing, `Jest` is used, in combination with `ngspectator` for easier and writing of tests. Unit tests don't test a lot of functionalities,
but they stand as a proof of concept.

On every push to GitHub, a GitHub action is executed, building the application and running the tests. In case of a failure, the developer
gets notified and a report gets generated.

### Eslint + Prettier
The project utilizes both `eslint` and `prettier` to ensure code quality does not get sacrificed by piled up junk and dead code
while the codebase expands.

### Husky
This project uses Husky to check different things before comitting and before pushing.

Before a commit is actually finalized, `npm run lint` will get executed, to ensure that the code matches up to the set standard by the lint rules.

Before a push is made, `npm run build` will be executed, ensuring that anything which ends up on a public repository is at the very least able to be started.

## Styling

Across the application, SCSS is used as a `css` preprocessor of choice for no particular reason.

CSS is built following the SCSS-7-1 architecture, making scalability and separation of concerns not a problem.


## Running the application

After cloning this repository, run
`npm install` to install all the necessary dependencies.

Since OpenWeatherMaps requires an API key to use their service, the API key will be stored on the machine in the project folder.

To do that, create a `.env` file in the root of this project, following this pattern

```
OPEN_WEATHER_MAPS_API_KEY=<YOUR_API_KEY>
```

After creating the `.env`, file, check if a `environments` folder exists in the `src` folder.

If it doesn't, then create it.

After creating the folder, run `npm run build`, that will set up the environment file for the Angular application to use the API key you provided.

Be careful when committing as to not commit your API keys accidentally.

After `npm run build` and confirming that `environment.ts` file exists, you can run the application using `npm run start`.
