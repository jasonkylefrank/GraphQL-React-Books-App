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

Database requirement
--------------------
For the data store of this application, you have two main choices:
1. **Setup your own database**.  The [video tutorial series](https://www.youtube.com/watch?v=ed8SzALpx1Q) that I followed explains how to set that up.
2. **Use hard-coded JavaScript objects**.  I have those available in commented-out sections.

I used an mLab MongoDb for the backend data store.  If you want to run the app using a true database backend, you'll need to set that up yourself and edit the connection string in `app.js`.

Additionally, if you want to hide your database credentials as I did, you'll need to use a `.env` file in the root of the project (this file does not get included in source control due to my `.gitignore`).

TODO: Upload a screenshot showing this section of the `app.js` file...




