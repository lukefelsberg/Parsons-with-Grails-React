import { Card, CardContent, Typography } from "@mui/material";
import { Moment } from "moment";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';

const API_URL = "http://localhost:8080"

class Solution {
    id: string;
    problemid: string;
    UFID: string;
    solution: string[];
    datetime: Moment;
    
    constructor (id: string, problemid: string, UFID: string, solution: string[], datetime: Moment) {
        this.id = id;
        this.problemid = problemid;
        this.UFID = UFID;
        this.solution = solution;
        this.datetime = datetime;
    }

    hasUFID() {
      return this.UFID;
    }

    deleteSolution(solutionid: string) {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': API_URL? API_URL : "*"},
      }
      console.log(solutionid)
      
      fetch(API_URL+"/solutions/"+solutionid, requestOptions)
      console.log("DELETED " + API_URL+"/solutuons/"+solutionid)

      window.location.reload()
    }

    SolutionData(): ReactElement {
      let lines = []

      for (let key in this.solution) {
        lines.push(<Typography style={{backgroundColor: "whitesmoke", display: "block", fontFamily: "monospace"}}>
          {this.solution[key]}
        </Typography>)
        lines.push(<br/>)
      }

      return <div>
        {lines}
      </div>
    }

    // modeled similarly to ProblemCard, for use on SolutionListView
      // still need to add view for specific solution
    SolutionCard(): ReactElement {
        return (
          <Card sx={{ minWidth: 275 }} key={this.id}>
            <CardContent>
              <Typography variant="h5" component="div">
                Submitted by {this.UFID}
              </Typography>
              <Typography variant="body2">
                {this.SolutionData()}
              </Typography>
              <Button variant="contained" href={'/view/'+this.id}>View Solution</Button>
              <Button style={{float:"right"}}color="error" 
              onClick={() => {if(window.confirm('Delete this submitted solution?')){this.deleteSolution(this.id)}}} 
              variant="contained">Delete</Button>
              <Typography sx={{ fontSize: 11 }} color="text.secondary" align={"right"}>
                id: {this.id}
              </Typography>
            </CardContent>
          </Card>
        );
      }
}


export default Solution;