# api-power-bi

The react and dot net core application to show case capabilities of embedding Power BI reports into Single Page application

## Capabilities and Features:
1.	Dynamic Navigation based Power BI user access and filter. 
2.	Authentication support
3.	Role based authorization.
4.	Authorization at Content level, e.g., if you access to only view specific region, you will only see specific data
5.	Dynamic filtering based on role as required.


# Client React App

## Features

1. Built using [Create React App](https://github.com/facebook/create-react-app) with Typescript
2. Built in Inputs, Buttons, Dropdowns, Datepicker, etc. customizable components
3. Configurable custom Dropdown component with Combobox, AutoComplete types, support for Keyboard Navigation
4. Built in Modals, Error handling, Notifications, Messages, Spinners, etc. customizable components
5. Built in Customizable Form library with [React Hook Form](https://react-hook-form.com) [Yup](https://github.com/jquense/yup) validations
6. React Routing with screen, components and libraries
7. Dynamic [odata-query](https://www.npmjs.com/package/odata-query) support
8. Configurable Custom JWT Authentication and Azure Authentication support using [msal](https://www.npmjs.com/7ackage/@azure/msal-browser) library
9. Customizable Table, Add/Edit Form components
10. Internationalization support using [react-intl](https://github.com/formatjs/formatjs)
11. UI Theme support at user level


### Run

#### `npm install`

#### `npm run start`

#### `npm run build`

#### `npm run prettier-check`

#### `npm run test`

<br />
<br />

# Backend AspNetCore 5

## Features

1. Built using AspNetCore 5, Mongo Db, Repositories and Services and Docker
2. Integrated support for Fluent Validators
3. Integration of [CacheManager](https://github.com/MichaCo/CacheManager) with MemCache and Redis backplane with integrated Caching Services
4. Configurable Serilog Logging, Linting with MS stylecop, roslynators and Swagger
5. Configurable Custom JWT Authentication and Azure Authentication
6. Middleware, Helpers and Accelerators
7. OData Query Parser Support with configurable to use any Custom Database Query Builder
8. MondoDb Dynamic Query Builder
9. Support for MongoDb Dynamic Repository with both Typed and BsonDocument
