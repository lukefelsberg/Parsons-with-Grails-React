import { Accordion, AccordionDetails, AccordionSummary, Avatar, ButtonGroup, Card, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, Typography } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import { ArrowDownward, ArrowUpward, Margin, ExpandMore } from '@mui/icons-material';
import Solution from './Solution';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

const API_URL = "http://localhost:8080"
//const API_URL = process.env.REACT_APP_API_URI

function DisplaySolutions(solutions: Solution[]) {
    let elements = [];
    for (let index in solutions) {
      let accordion = <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore/>}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid
        container
        direction="row"
        >
          <Typography  sx={{ width: '33%', flexShrink: 0 }}>{solutions[index].UFID}</Typography>
          <Typography  sx={{ color: 'text.secondary', flexShrink: 0, justifyContent: "flex-end" }} justifyContent={"flex-end"}>{solutions[index].datetime.fromNow()}</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        {solutions[index].SolutionCard()}
      </AccordionDetails>
    </Accordion>
      elements.push(accordion)
    }
    return <div style={{margin: "1em"}}>
      {elements}
    </div>
}

function SolutionListView() {

    const location = useLocation();
    console.log(location)
    const pathname = location.pathname.split("/")
    const problemid = pathname[2]

    const [solutions, setSolutions] = useState<Solution[]>([]);

    const fetchSolutionList = () => {
        fetch(API_URL+"/solutions/")
          .then(response => {
            console.log(API_URL)
            console.log(response)
            return response.json()
          })
          .then(data => {
            console.log(data)
            let solutions: Solution[] = [];
            for (let key in data) {
              let entry = data[key];
              if (problemid === entry.problemid) {
                let sol = new Solution(key, entry.problemid, entry.UFID, entry.solution, moment(entry.datetime))
                solutions.push(sol)
                console.log(solutions)
              }
            }
            setSolutions(solutions)
          })
      }

    useEffect(() => {
      fetchSolutionList();
    }, []);

    return <div>
      <Typography>
        Viewing all solutions for Problem {problemid}:
      </Typography>
      {DisplaySolutions(solutions)}
    </div>
}

export default SolutionListView;
