z# Fuse - Angular

Fuse: [Click here](http://fusetheme.com/)
Angular Material: [Click here](https://material.angular.io/)

## Naming Conventions and Standards

**General Standards:**

-   Consider limiting files to 400 lines of code.
-   Do define one thing, such as a service or component, per file.
-   Do define small functions. Consider limiting functions to no more than 75 lines.
-   Each function should be responsible for only one thing (_Single-responsibility principle_).
-   Do use upper camel case for class names. (example: LoginClass).
-   For naming variables (not SCSS variables), use camel case pattern (example: userInfo).
-   For naming CSS classes and variables of SCSS, use the kebab case pattern (example: main-header).
-   Do use a hyphenated, lowercase element for the component's selector value; (example: admin-users).
-   Do structure the app such that you can Locate code quickly, Identify the code at a glance, keep the Flattest structure you can, and Try to be DRY. Avoid being so DRY that you sacrifice readability

**Services:**
We shall always start the function that is responsible for the API call with a phrase suitable to its HTTP verb:

-   GET => 'get'
-   PUT => 'update'
-   POST => 'create', sometimes the API is not _standard_, and we send a POST request to actually get data or update data. In these cases, we shall use the phrase that indicates the function's functionality.
-   DELETE => 'delete', the word 'remove' is suitable as well, but since we are trying to standardize everything, we should all use one thing.
-   Keep that in mind to only and only write 'API calls' within the services and avoid writing logics in the services. The only _no-API-call_ function that is valid within a service is a function responsible for creating HTTP params when the argument(s) is/are an _Array_ or and _Object_

**Interfaces:**

-   Do use the upper camel case for interface names. (example: User).
-   Avoid including 'interface' at the end of the Interface name or start its name with 'I' because it violates the encapsulation principles. (example: IUser, UserInterface)

**Components and Classes:**

-   Component's selector should always have the kebab-case notation.
-   Try to use fewer variables as possible, but it should not change code, complexity and keep that in mind to always remain _KISS_.
-   Try to **not** use _brackets{}_ for a single line. (example: _this.getUserInfo().subscribe(result => this.userInfo = result)_)
-   Always keep variables at the top of Class and then after variables, keep the _constructor_ and after all write down the rest of the methods
-   Use camelCase notation for naming methods and variables.
-   Start _Boolean_ variables names with 'is' or 'has/have' except 'loading' which is pretty obvious that it keeps a boolean variable.
-   Start methods that listen to changes or functions that should be invoked on a certain point with 'on' (example: onSubmit() for a function when the user clicks on a button or onCalculationFinish() for a function that should be invoked after some calculation ends)

## Git-Flow

### We have three main branches:

**master** : This branch is the main branch, and we will only push clean code that has been passed the tests.

**stage**: With the help of Git-Tag, we will release our software on this branch, this branch is the one that we represent to support guys to test.

**dev** : The branch that we are working on, adding features and debugging the issues.

_Other Important features:_

**hotfix/< scope >**: For bugs that appears in production, we will create a hotfix group branch from _master_ branch and then merge it into _master_

**bugfix/< scope >**: Failed tests and trello cards reported by support team should be fixed in this group branch and then this will be merged into _stage_

**feature/< scope >**: Features will be added to _dev_ branch, and they are group branch as well.

**refactor/< scope >**: For refactoring project and then merging it into _dev_.

**merge**: merging one branch to _dev_ locally.

**release**: We are not using this feature of GitFlow

## State Management for Services:

We have an enum responsible for demonstrating current state of application. The enum is like bellow:

export enum stateType {
'LOADING',
'FAILED',
'SUCCESS',
...}

The strings in the enum could be different from above.

## How to add/remove module

**For Older Modules**

1. Add/remove your module to/from `/src/app/modules/.`
1. Add/remove the module to/from `/src/app.module.ts`
1. Add/remove Routes to/from `/src/app.module.ts (router array)`
1. Add/remove Navigations to/from `/src/app/navigations/navigation.ts`

**For Newer Modules (like: Portfolio Management)**

1. Add/remove your module to/from `/src/app/modules/.`
1. Add/remove the module to/from `/src/app.module.ts`

## Commit Message Naming Convention

< type >(< scope >)[for breaking changes: "!"]: < commit message: usually starts with a verb >

type can be one of the following:

**types = ['ci', 'chore', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style'];**

Example 1 : fix(userDetails)!: Fix user profile
Example 2 : chore!: Update project packages

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
