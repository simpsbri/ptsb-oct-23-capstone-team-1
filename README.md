# ptsb-oct-23-capstone-team-1

_Simple Multi-Page App with React Router_

This is a simple multi-page application built using React, React Router, and react-router-dom.

## Prerequisites

To run this app, you need to have Node.js and npm installed on your computer. You can download both from [here](https://nodejs.org/).

## Getting Started

1. Clone this repository to your local machine:

```
git clone https://github.com/your-username/your-repo.git
```

2. Navigate to the project directory:

```
cd your-repo
```

3. Install the dependencies:

```
npm install
```

4. Start the development server:

```
npm start
```

5. Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

## Application Structure

This app has the following structure:

- `App.js`: the main component of the app.
- `index.css`: the global CSS styles.
- `routes/`: a directory containing the route components.
  - `root.js`: the root route component.
  - `businesses.js`: the businesses route component.
  - `users.js`: the all users route component.
  - `projects.js`: the projects route component.

## Routing

This app uses `react-router-dom` for routing. The following routes are defined:

- `/`: the root route, which renders the `Root` component.
- `/businesses`: the businesses route, which renders the `Businesses` component.
- `/api/user`: the all users route, which renders the `AllUsers` component.
- `/projects`: the projects route, which renders the `Projects` component.

## Conclusion

This is a simple multi-page app built using React, React Router, and react-router-dom. You can use it as a starting point for building your own apps.
