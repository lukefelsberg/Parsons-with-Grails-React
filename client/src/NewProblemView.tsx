import { Avatar, ButtonGroup, Card, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, Typography, colors } from '@mui/material';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { ArrowDownward, ArrowUpward, Send } from '@mui/icons-material';
import { setConstantValue } from 'typescript';

  const API_URL_NEW = process.env.REACT_APP_API_URL
//const API_URL = process.env.REACT_APP_API_URI


function NewProblemView() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [code, setCode] = useState("")
    const [email, setEmail] = useState("")

    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openFail, setOpenFail] = React.useState(false);
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
      ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });


    function SubmitProblem(title: string, data: string[], email: string, description: string) {
        let payload = {
            "submitter": email,
            "title": title,
            "problem": data,
            "description": description,
            "datetime": new Date()
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: String(JSON.stringify(payload))
        };
        fetch(API_URL_NEW+'/problems', requestOptions)
            .then(response => {
                if (response.ok) {
                    response.json()
                    handlePostSuccess();
                    setTitle("");
                    setDescription("");
                    setCode("");
                    setEmail("");
                } else {
                    handlePostFailure();
                    setTitle("");
                    setDescription("");
                    setCode("");
                    setEmail("");
                }
                })
            .then(data => console.log(data)
            )
    };

   
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
      


    return <Grid container style={{gap:12}} padding={2} columns={{xs:2}}>
        <Grid xs={2} display="flex" justifyContent="left" alignItems="center" columns={{xs:2}}>
        <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Title"
            defaultValue=""
            value={title}
            onChange={e => setTitle(e.target.value)}>
        </TextField>
        </Grid>
        <Grid xs={2} display="flex" justifyContent="left" alignItems="center">
        <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Description"
            multiline
            defaultValue=""
            value={description}
            onChange={e => setDescription(e.target.value)}>
        </TextField>
        </Grid>
        <Grid xs={2} display="flex" justifyContent="left" alignItems="center">
        <TextField
            fullWidth            
            id="outlined-multiline-static"
            label="Code"
            multiline
            rows={8}
            defaultValue=""
            value={code}
            onChange={e => setCode(e.target.value)}>
        </TextField>
        </Grid>
        <Grid xs={1} display="flex" justifyContent="left" alignItems="center">
        <TextField
            style={{width:400}}
            id="outlined-multiline-static"
            label="Submitter email"
            defaultValue=""
            value={email}
            onChange={e => setEmail(e.target.value)}>
        </TextField>
        </Grid>
        <Grid xs={2} display="flex" justifyContent="flex-end" alignItems="center">
        <Button style={{width:300}} disabled={title.length == 0 || email.length == 0 || code.length == 0} color="success" onClick={() => {SubmitProblem(title, code.split("\n"), email, description)}}variant="contained" endIcon={<Send />}>
        Submit Problem
        </Button>
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
    </Grid>
}

export default NewProblemView;
