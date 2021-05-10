# NgRx Workshop - ng-conf 2020
# https://github.com/CodeSequence/ngrx-workshop-ngconf2020
## Setup
To get started, ensure that you have *at least* Node v10 installed. You can verify what version you have installed by running 
```sh
node --version
```
from your terminal. Then, fork this repository to your personal Github account. As you make changes to the codebase during this workshop you will be pushing your changes to your personal fork. You can [learn more about forks here](https://help.github.com/en/github/getting-started-with-github/fork-a-repo). 

Once you have forked this repository, clone your fork to your development machine. Then run the following command using your terminal from the root of the repository to install dependencies.

```sh
npm install
```

or

```sh
yarn
```

With the dependencies installed run the app to verify everything is working correctly.

## Running the app
To run the app execute the following command from your terminal:
```sh
npm start
```
or

```sh
yarn start
```

The app should now be running at [http://localhost:4200](http://localhost:4200)


# State flows down, changes flow up
# Indirection between state and consumer
# Select & Dispatch => Input and Output
# Adhere to single responsibility principle

# Reducers - Product new States. Receive the last state and next action. Use pure, immutable operations


# Meta-Reducers - Intercept actions before they are reduced
# Meta-Reducers - Intercept state before it is emitted
# Meta-Reducers - Can change control flow if the store