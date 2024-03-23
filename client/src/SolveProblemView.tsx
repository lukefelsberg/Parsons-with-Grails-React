import { Avatar, ButtonGroup, Card, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { ArrowDownward, ArrowUpward, Fingerprint, Send } from '@mui/icons-material';
import { useLoaderData, useParams } from 'react-router-dom';
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
//const API_URL = process.env.REACT_APP_API_URI

function getMorphedList(order: number[], list: string[]) {
    let morphed_list = []
    for (let index in order) {
        morphed_list.push(list[order[index]])
    }
    return morphed_list
}



function SolveProblemView() {

    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openFail, setOpenFail] = React.useState(false);
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
      ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });


    function SubmitSolution(UFID: string, data: string[], problemid: string) {
        let payload = {
            "UFID": UFID,
            "solution": data,
            "problemid": problemid,
            "datetime": new Date()
        }
        console.log(payload)
        console.log(payload.problemid)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': API_URL? API_URL : "*"},
            body: JSON.stringify(payload)
        };
        fetch(API_URL+'/solutions', requestOptions)
            .then(response => {
                if (response.ok) {
                    response.json()
                    handlePostSuccess();
                    setUFID("");
                } else {
                    handlePostFailure();
                    setUFID("");
                }
                })
            .then(data => console.log(data))
    }

    function handlePostSuccess() {
        setOpenSuccess(true);
    };

    function handlePostFailure() {
        setOpenFail(true);
    }
      
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
                return;
      }
      
      setOpenSuccess(false);
      setOpenFail(false);
    };
      
    

    console.log(API_URL)
    let rawData: any = useLoaderData();
    let problem = new Problem(String(parseInt(rawData.id)-1), rawData.title, rawData.description, rawData.problem, rawData.submitter, moment(rawData.datetime))
    let lines = problem.problem
    console.log(lines)

    let keys: number[] = Array.from(lines.keys())

    const [order, setOrder] = useState(keys);
    const [UFID, setUFID] = useState("");

    function moveItemUp(key: number) {
        let order_copy = order.slice()
        let original_idx = order.indexOf(key)
        order_copy[original_idx] = order[original_idx-1]
        order_copy[original_idx-1] = order[original_idx]
        setOrder(order_copy)
    }

    function moveItemDown(key: number) {
        let order_copy = order.slice()
        let original_idx = order.indexOf(key)
        order_copy[original_idx] = order[original_idx+1]
        order_copy[original_idx+1] = order[original_idx]
        setOrder(order_copy)
    }

    function makeItemsFromStrings(list: string[]) {
        let items = []
        for (let i = 0; i < lines.length; i++) {
            items.push(
                <ListItem
                    key={order[i]}
                    secondaryAction={
                        <ButtonGroup>
                            {i > 0 ?
                            <IconButton edge="end" aria-label="delete" onClick={() => moveItemUp(order[i])}>
                                <ArrowUpward />
                            </IconButton> : <div></div>
                            }
                            {i < lines.length-1 ?
                            <IconButton edge="end" aria-label="delete" onClick={() => moveItemDown(order[i])}>
                                <ArrowDownward />
                            </IconButton> : <div></div>
                            }
                        </ButtonGroup>
                    }
                    >
                        <Card 
                        style={{fontFamily: "monospace", width: "90%", padding: "1rem"}}
                        >
                        <ListItemText
                        primary={list[i]}
                    />
                        </Card>

                </ListItem>
            )
        }
        return items
    }



    return <Grid item xs={12} md={6}>
    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
      Reorder the code
    </Typography>
    <Paper variant="outlined">
        <List>
            {makeItemsFromStrings(getMorphedList(order, lines))}
        </List>
    </Paper>
    <br></br>
    
    <Grid container spacing={1} minHeight={100}>   
        <Grid item xs={4.5}/>
            <Grid xs={2} display="flex" justifyContent="center" alignItems="center">
                <TextField id="outlined-basic" label="UFID" value = {UFID} variant="outlined" onChange={e => setUFID(e.target.value)}/> 
            </Grid>
            <Grid xs={1} display="flex" justifyContent="center" alignItems="center">
                <IconButton color="success" onClick={() => SubmitSolution(UFID, lines, problem.id)} disabled={UFID.length != 8}>
                    <Send />
                </IconButton>
            </Grid>
        <Grid item xs={4.5}/>
    </Grid>
    <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Submitted Successfully!
              </Alert>
        </Snackbar>
    <Snackbar open={openFail} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Error Submitting.
              </Alert>
        </Snackbar>
  </Grid>
  
}

export default SolveProblemView;
