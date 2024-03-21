import { Avatar, ButtonGroup, Card, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { ArrowDownward, ArrowUpward, Fingerprint, Send } from '@mui/icons-material';
import { useLoaderData, useParams } from 'react-router-dom';
import Problem from './Problem';
import moment from 'moment';

const API_URL = process.env.REACT_APP_API_URI

function getMorphedList(order: number[], list: string[]) {
    let morphed_list = []
    for (let index in order) {
        morphed_list.push(list[order[index]])
    }
    return morphed_list
}

function AboutView() {

    
    let lines: string[] = ['public static void main(String[] args) {','}', 'System.out.println("Hello World"', '}','class HelloWord {'];

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
        <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
            Welcome to the Parson's Problem System! On this web app, you can create custom "drag-and-drop" style code problems for students.
        </Typography>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            To get started, create a new problem using the "New Problem" button on the home page. Give the problem a unique title and corresponding description, type the code you'd like students to re-order, and add your creator name.
            Once the problem is present on the site's problem list (accessible from "Problems" on the homepage), you can share the link to solve a problem.
        </Typography>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Say you created a simple "Hello World" problem you'd like your students to solve. Once its created, you can share the solve link and students will receive this:
        </Typography>
    <Typography sx={{ mt: 4, mb: 2 }} variant="subtitle1" component="div">
      Reorder the code
    </Typography>
    <Paper variant="outlined">
        <List>
            {makeItemsFromStrings(getMorphedList(order, lines))}
        </List>
    </Paper>
    <br></br>
    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Students are prompted to submit their solution with their UFID. You can view all submitted solutions to a corresponding problem by clicking the "View Solutions List" button on a problem in the list. 
    </Typography>

    </Grid>

}

  


export default AboutView;
