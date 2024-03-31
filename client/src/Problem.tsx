import { Card, CardContent, Typography } from "@mui/material";
import { Moment } from "moment";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import Solution from "./Solution";

const API_URL = "http://localhost:8080"

class Problem {
    id: string;
    title: string;
    desc: string;
    problem: string[];
    submitter: string;
    datetime: Moment;
    
    constructor (id: string, title: string, desc: string, problem: string[], submitter: string, datetime: Moment) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.problem = problem;
        this.submitter = submitter;
        this.datetime = datetime;
    }

    hasTitle() {
        return this.title;
    }

    deleteProblem(problemid: string) {

      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': API_URL? API_URL : "*"},
      }
      fetch(API_URL+"/problems/"+problemid, requestOptions)
      .then(() => window.location.reload())


      fetch(API_URL+"/solutions")
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
              if (problemid == String(entry.problemid)) {
                fetch(API_URL+"/solutions/"+entry.id, requestOptions)
                .then(() => window.location.reload())
                console.log("DELETED " + API_URL+"/solutuons/"+entry.id)
              }
            }
          })
    }

    ProblemData(): ReactElement {
      let lines = []

      for (let key in this.problem) {
        lines.push(<Typography style={{backgroundColor: "whitesmoke", display: "block", fontFamily: "monospace"}}>
          {this.problem[key]}
        </Typography>)
        lines.push(<br/>)
      }

      return <div>
        {lines}
      </div>
    }

    ProblemCard(): ReactElement {
        return (
          <Card sx={{ minWidth: 275 }} key={this.id}>
            <CardContent>
              <Typography variant="h5" component="div">
                {this.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {this.desc}
              </Typography>
              {this.ProblemData()}
              <Button variant="contained" href={'/solve/'+this.id}>Solve</Button>
              <span> </span>
              <Button variant="text" href={'/viewsolutions/'+this.id}>View Solutions List</Button>
              <span> </span>
              <Button style={{float:"right"}}color="error" 
              onClick={() => {if(window.confirm('Delete this problem and its associated solutions?')){this.deleteProblem(this.id)}}} 
              variant="contained">Delete</Button>
              <Typography sx={{ fontSize: 11 }} color="text.secondary" align={"right"}>
                id: {this.id}
              </Typography>
            </CardContent>
          </Card>
        );
      }

    InfoCard(): ReactElement {
        return (
          <Card sx={{ minWidth: 275 }} key={this.id}>
            <CardContent>
              <Typography variant="h5" component="div">
                {this.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {this.desc}
              </Typography>
              {this.ProblemData()}
              <Typography sx={{ fontSize: 11 }} color="text.secondary" align={"right"}>
                id: {this.id}
              </Typography>
            </CardContent>
          </Card>
        );
      }
}

export default Problem;