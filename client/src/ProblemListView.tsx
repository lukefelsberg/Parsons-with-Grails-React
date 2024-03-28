import { Accordion, AccordionDetails, AccordionSummary, Avatar, ButtonGroup, Card, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, ThemeProvider, Typography } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import { ArrowDownward, ArrowUpward, Margin, ExpandMore } from '@mui/icons-material';
import Problem from './Problem';
import moment from 'moment';


/*
DraggableList
entries: type String[], a list of strings that will be displayed as draggable elements in this component

return:
    a component that contains a list of strings that can be dragged around and rearranged


resources:
https://react-dnd.github.io/react-dnd/examples/sortable/simple
https://github.com/react-dnd/react-dnd/tree/main/packages/examples/src/04-sortable/simple

*/

const API_URL = "http://localhost:8080"
//was const API_URL = process.env.REACT_APP_API_URI

function DisplayProblems(problems: Problem[]) {
    let elements = [];
    for (let index in problems) {
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
          <Typography  sx={{ width: '33%', flexShrink: 0 }}>{problems[index].title}</Typography>
          <Typography  sx={{ width: '50%', color: 'text.secondary', flexShrink: 0 }}>{problems[index].desc}</Typography>  
          <Typography  sx={{ color: 'text.secondary', flexShrink: 0, justifyContent: "flex-end" }} justifyContent={"flex-end"}>{problems[index].datetime.fromNow()}</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        {problems[index].ProblemCard()}
      </AccordionDetails>
    </Accordion>
      elements.push(accordion)
    }
    return <div style={{margin: "1em"}}>
      {elements}
    </div>
}

function ProblemListView() {

    const [problems, setProblems] = useState<Problem[]>([]);
  
    const fetchProblemList = () => {
        fetch(API_URL+"/problems")
          .then(response => {
            console.log(API_URL)
            console.log(response)
            return response.json()
          })
          .then(data => {
            let problems: Problem[] = [];
            for (let key in data) {
              let entry = data[key];
              let prob = new Problem(entry.id, entry.title, entry.description, entry.problem, entry.submitter, moment(entry.datetime))
              if (prob.hasTitle())
              problems.push(prob)
              console.log(problems)
            }
            setProblems(problems)
          })
      }

    useEffect(() => {
      fetchProblemList();
    }, []);
    // TODO: pull list of problems from GET /problems/ API route
    //          display metadata about problem including
    //              name
    //              description

    // also could do:
    //          sort problems by
    //              alphabetical
    //              submitter
    //              datetime created
    return <div>
      <Typography variant="h5">
        Problems
      </Typography>
      {DisplayProblems(problems)}
    </div>
}

export default ProblemListView;
