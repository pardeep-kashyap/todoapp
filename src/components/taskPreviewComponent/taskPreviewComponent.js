import React from "react";
import classes from "./taskPreviewComponent.scss";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox, Icon, Tooltip, withStyles } from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import {connect} from "react-redux";
import { Button } from '@material-ui/core';
import Axios from 'axios';
import Fade from '@material-ui/core/Fade';
import { timeSinceText} from './../../utils/util';



const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  

class TaskPreviewComponent extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            descriptions: '',
            open: false,
            Transition: Fade,
            message:''
          }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedObj.descriptions !== this.state.descriptions) {
          this.setState({ descriptions: nextProps.selectedObj.descriptions });
        }
    }
    postTask=()=>{
        delete this.props.selectedObj.updated_at;
        this.props.selectedObj.descriptions=this.state.descriptions;
        Axios.post('task/save',this.props.selectedObj).then((response)=>{
            console.log(response);
            if(response.data.success){
                console.log("Save !")
                this.setState({
                    message:'Description Saved Successfully'
                })
            }
        }).catch((error)=>{
            console.log(error);
        });
    }
    
    handleTaskClick(key){
        this.props.selectedObj[key]=!this.props.selectedObj[key];
        this.postTask();
    }

    render() {
        return (
            <div className={classes.TaskInDetail}>
            <div className={classes.TaskPreview}>
                <div className={classes.TaskTittle}>
                    <FormGroup row>
                        <FormControlLabel
                            className={`${this.props.selectedObj.status?classes.strike:''}`}
                            control={<GreenCheckbox checked={this.props.selectedObj.status} onChange={()=>this.handleTaskClick('status')} name="checkedG" />}
                            label={this.props.selectedObj.taskName}
                        />
                    </FormGroup>

                    <Tooltip title={`${this.props.selectedObj.important?'':'Not '}Important`} arrow>
                        <span  onClick={()=>this.handleTaskClick('important')} className={`${classes.star} ${this.props.selectedObj.important?classes.important:''}`}>
                            <Icon>grade</Icon>
                        </span>
                    </Tooltip>
                </div>

                <TextField
                    id="outlined-multiline-static"
                    label="Add Notes"
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={(event)=>this.setState({ descriptions:event.target.value})}
                    value={this.state.descriptions}
                />
                <div className={classes.uploadSection}>
                <span className={classes.timeAgo}>
                    <b>Created</b> {timeSinceText(new Date(this.props.selectedObj.created_at))} ago
                </span>  
                      <Tooltip title='Save Task' arrow>
                    <Button className={classes.MuiButtonBaseRootButton}  onClick={()=>this.postTask()} type="submit" variant="contained" startIcon={<Icon>save</Icon>} >
                         Save
                    </Button>
                    </Tooltip>
                </div>
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        selectedObj: state.selectedObj,
    };
};

export default connect(
mapStateToProps,
null
)(TaskPreviewComponent);

