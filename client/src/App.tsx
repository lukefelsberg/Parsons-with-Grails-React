import React, { useCallback } from 'react';
import './css/App.css';
import DraggableList from './SolveProblemView';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  useRouteLoaderData,
} from "react-router-dom";
import MenuIcon, { School, Snowboarding, Style } from '@mui/icons-material/';

import { AppBar, Button, IconButton, Paper, ThemeProvider, Toolbar, Typography, colors, createTheme } from '@mui/material';
import NewProblemView from './NewProblemView';
import SolutionListView from './SolutionListView';
import SolveProblemView from './SolveProblemView';
import { padding } from '@mui/system';
import ProblemListView from './ProblemListView';
import ViewSpecificSolution from './ViewSpecificSolution';
import AboutView from './AboutView';



function App() {

/* 
TODO: get query params from URL and assign to some variable of type string[]

resources:
https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
ctrl-f for "getAll" to get all query params from the URL
*/


  let dummyStringList: string[] = ['A', 'B', 'C', 'D', 'E'];
  //const API_URL = "http://localhost:8080"
  const API_URL = process.env.REACT_APP_API_URI
  const API_URL_NEW = process.env.REACT_APP_API_URL
  console.log(API_URL_NEW)

  const logo = require('./images/UF-COE_Logo.png')
  const font = require('./fonts/Gentona Bold.woff2')

  const boldFontTheme = createTheme({
    typography: {
      fontFamily: 'Gentona Bold',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Gentona';
            font-style: bold;
            font-display: swap;
            font-weight: 400;
            src: local('Raleway'), local('Raleway-Regular'), url(${font}) format('woff2');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Button variant="outlined" href="about">About Us</Button>
          <br/><br/>
          <Button variant="outlined" href="problems">Problems</Button>
          <br/><br/>
          <Button variant="outlined" href="new">New Problem</Button>
        </div>
      ),
    },
    {
      path: "about",
      element: <AboutView/>,
    },
    {
      path: "solve/:problemid",
      loader: async ({ request, params }) => {
        return fetch(
          API_URL_NEW + "/problems/" + params.problemid,
          { signal: request.signal }
        );
      },
      element: <SolveProblemView/>
    },
    {
      path: "viewsolutions/:problemid",
      loader: async ({ request, params }) => {
        return fetch(
          API_URL_NEW + "/solutions/"+params.problemid, // use API route for specific problem solutions (still need to add)
          { signal: request.signal }
        );
      },
      element: <SolutionListView></SolutionListView>
    },
    {
      path: "view/:solutionid",
      loader: async ({ request, params }) => {
        return fetch(
          API_URL_NEW + "/solutions/"+params.solutionid,
          { signal: request.signal }
        );
      },
      element: <ViewSpecificSolution></ViewSpecificSolution>
    },
    {
      path: "new",
      element: <NewProblemView/> // making a parson's problem
    },
    {
      path: "problems",
      loader: async ({ request, params }) => {
        return fetch(
          API_URL+`problemlist`,
          { signal: request.signal }
        );
      },
      element: <ProblemListView></ProblemListView> // viewing list of submitted parsons' problems
    },
    {
      path: "submitted",
      element: <SolutionListView></SolutionListView> // viewing list of submitted parsons' problems
    },
    {
      path: "solution",
      element: <div>solution</div> // viewing a specific solution
    },
  ]);
  
  return (
    <div className="App">
            <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
            href="/"
          >
            <School />
          </IconButton>
          <ThemeProvider theme={boldFontTheme}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            Parsons Problems Platform
          </Typography>
          </ThemeProvider>
          <img src={logo} width={350} height={35} alt="UF COE Logo"></img>
        </Toolbar>
      </AppBar>
      <div style={{padding: "1rem"}}>
      <Paper   style={{padding: "1rem"}}>
        <RouterProvider router={router}/>
      </Paper>
      </div>
    </div>
  );

  }

export default App;
