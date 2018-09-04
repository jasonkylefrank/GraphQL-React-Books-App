# GraphQL-React-Books-App
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

Practice app to learn GraphQL on the front and back ends.  To get it started I followed [this tutorial](https://www.youtube.com/watch?v=ed8SzALpx1Q).

Besides **GraphQL**, it uses **MongoDb** and **Mongoose** on the backend, with **React** and **Apollo** on the front-end.

For styling, I used [Styled Components](https://www.styled-components.com/) and [Polished](https://polished.js.org/).

Quick start
-----------
After downloading or cloning this repo, install the necessary dependencies:
```
npm install
```

Next you'll need to fire-up two different development servers: one for the backend code and another for the front-end.

The backend and the front-end directories each have their own `package.json`.  So from the root of the project change into each of those respective directories and run the `npm run start` command.

First let's fire-up the development server for the backend code:
```
cd server
npm run start
```
Now in a separate terminal, fire-up the front-end server.  From the root of the project:
```
cd client
npm run start
```
Now you can make code edits to either the backend or front-end code and see your changes rebuilt and refreshed in your browser. 🙌
