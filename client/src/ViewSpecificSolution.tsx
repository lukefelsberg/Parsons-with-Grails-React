import { Avatar, ButtonGroup, Card, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { ArrowDownward, ArrowUpward, Fingerprint, Send } from '@mui/icons-material';
import { useLoaderData, useParams } from 'react-router-dom';
import Problem from './Problem';
import Solution from './Solution';
import moment from 'moment';


//const API_URL = process.env.REACT_APP_API_URI
const API_URL = "http://localhost:8080"

function getMorphedList(order: number[], list: string[]) {
    let morphed_list = []
    for (let index in order) {
        morphed_list.push(list[order[index]])
    }
    return morphed_list
}

function ViewSpecificSolution() {

    console.log(API_URL)
    let rawData: any = useLoaderData();
    console.log(rawData)
    let solution = new Solution(rawData.id, rawData.problem_uid, rawData.UFID, rawData.solution, moment(rawData.datetime))
    let lines = solution.solution
    console.log(lines)

    let keys: number[] = Array.from(lines.keys())

    const [order, setOrder] = useState(keys);

    function makeItemsFromStrings(list: string[]) {
        let items = []
        for (let i = 0; i < lines.length; i++) {
            items.push(
                <ListItem
                    key={order[i]}
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
      Student {solution.UFID}
    </Typography>   
    <List>
            {makeItemsFromStrings(getMorphedList(order, lines))}
        </List>
        </Grid>

}

export default ViewSpecificSolution;
