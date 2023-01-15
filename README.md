# Getting Started with Superhero portal

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app

This is a monorepo which uses lerna.

## Assumptions 

1. You have registered your facebook and obtained your access token. I have hard-coded my token for simplicity

2. There are no explicit PUT/PATCH methods for updating the superhero details. Hence assumed there are such methods and have written the mutations appropriately but that feature wouldn't work for now.

## Problems faced when building this project from scratch
|Serial No.|Problem | Resolution taken
|-----------|-----------|----------------
|1 | Graphql Schema import errors |Added ts-node/register in codegen.yml
|2 |Failed to load schema from ./src/schema.ts:  Unable to load from file "/superhero-portal/packages/backend/src/schema.ts": GraphQLError: Syntax Error: Expec…| yarn add graphql-scalars and added typescript: *scalars in codegen.yml
|3 |Aliased anchor not found: scalarmaps at line 16, column 21: | Scalar config was missing which was fixed later
|4|Frontend - export 'default' (reexported as 'ReactNativeFile') was not found in './ReactNativeFile.js' (module has no exports)| Looks like I did not install typescript related packages for urql - yarn remove @urql/exchange-multipart-fetch
|5| codegen errors-    Error 2: Cannot query field "powerstats" on type "SuperHeroSearch".|Incorrect mapping of results in the original schema- forgot to add select fields in the query
|6| the name in the search was always undefined| corrected typings
|7| Issue connecting to the graphql server | **could not be corrected **
   


## Available Scripts

In the project root directory, you can run:

### `yarn && yarn build:all`

The project also uses Graphql codegen. In order to generate the typings you can run:
### `yarn generate`

Run the backend in a separate terminal by navigating to backend folder
### `yarn start`

Open the graphql app in [http://localhost:3001/graphql](http://localhost:3001/graphql) to explore the backend

Run the main app in another separate terminal by navigating to the webapp folder
### `yarn start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\

The Graphql backend also has some tests. You can run the following command
### `yarn test`



