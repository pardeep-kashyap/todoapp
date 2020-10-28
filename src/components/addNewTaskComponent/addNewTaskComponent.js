import  React  from 'react';
import Axios from 'axios';
import { Icon, Button, Tooltip } from '@material-ui/core';
import classes from './addNewTaskComponent.scss'
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import {connect} from 'react-redux';
import * as actionTypes  from '../../store/actions/actionTypes'
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


const ListItem = ({index,value,timeSince,onClick,deleteTask,handleTaskClick}) =>(
    <li onClick={onClick} className={classes.addnewListItem}>
     
        <FormGroup row>
        <FormControlLabel
        className={`${value.status?classes.strike:''}`}
        control={<GreenCheckbox
            checked={value.status}
            onChange={()=>handleTaskClick(index,'status')}
            name="checkedG"  />}
        label={value.taskName}
      />

        </FormGroup>
        <span className={classes.timeAgo}>
            <b>Created</b> {timeSince(new Date(value.created_at))} ago
        </span>    

      <Tooltip title={`${value.important?'':'Not '}Important`} arrow>
        <span onClick={()=>handleTaskClick(index,'important')} className={`${classes.star} ${value.important?classes.important:''}`}>
          <Icon>grade</Icon>
      </span>
      </Tooltip>
      <Tooltip title="Delete Task" arrow>
      <Icon className={classes.materialIcons} onClick={() => deleteTask(index)} >delete</Icon>
    </Tooltip>

    </li>
)

const List = ({itemList,onItemClick,timeSince,deleteTask,handleTaskClick}) =>(
    <ul>
        {itemList.map((item, index) => <ListItem key={index} index={index} timeSince={timeSince} value={item} onClick={onItemClick} deleteTask={deleteTask} handleTaskClick={handleTaskClick} />)}
    </ul>
)

class AddNewTaskComponent extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){        
        super(props);
        this.state = {
            taskName: '',
            tasks:[]
          };
        this.addNewInList = this.addNewInList.bind(this);
        this._taskNameTextFieldChange = this._taskNameTextFieldChange.bind(this);
        this.deleteTask=  this.deleteTask.bind(this);
        this.handleTaskClick = this.handleTaskClick.bind(this);
    }

    fetchAllTasks=(index=0)=>{
        Axios.get('task/all').then((response)=>{
            console.log(response);
            if(response.data.success){
                this.setState({
                    tasks:response.data.data
                })
                
                this.props.setData(response.data.data[index])
            }
        }).catch((error)=>{
            console.log(error);
        });
    }
    componentDidMount(){
        this.fetchAllTasks();
    }
    
    addNewInList (event){
        event.preventDefault();
        this.postTask({taskName:this.state.taskName},0)
    }
    
    postTask=(task,index)=>{
        delete task.updated_at;
        Axios.post('task/save',task).then((response)=>{
            console.log(response);
            if(response.data.success){
                this.setState({
                    taskName:''
                })
                this.fetchAllTasks(index);
            }
        }).catch((error)=>{
            console.log(error);
        });
    }

    deleteTask =(index)=>{
            Axios.delete(`task/delete?taskId=${this.state.tasks[index]._id}`).then((response)=>{
                console.log(response);
                if(response.data.success){
                    let tasks= this.state.tasks;
                    tasks.splice(index,1);
                    this.setState({
                        tasks:tasks
                    })
                    this.fetchAllTasks(0);
                }
            }).catch((error)=>{
                console.log(error);
            });
    }

    _taskNameTextFieldChange(e) {
            this.setState({
                taskName: e.target.value
            });    
    }

    
    handleTaskClick(index,key){
        const state= this.state;
        state.tasks[index][key]=!state.tasks[index][key];
        this.postTask(state.tasks[index],index)
    }

    render() {
       return (
        <div className={classes.addnewContainer} >
            <div className={classes.textBoxSection}>
            <form onSubmit={this.addNewInList} autoComplete="off" >
                <TextField
                id="filled-multiline-static"
                label="Add New Task"
                variant="outlined"
                value={this.state.taskName}
                onChange={this._taskNameTextFieldChange}
                className={classes.MuiTextFieldRoot}
                />
                <Button className={classes.MuiButtonBaseRootButton} type="submit" variant="contained" startIcon={<Icon>add</Icon>} >
                Start !
            </Button>
            </form>
            </div>
            <div className={classes.taskList}>
              <List itemList={this.state.tasks || []} onItemClick={this.handleItemClick} timeSince={timeSinceText} deleteTask={this.deleteTask} handleTaskClick={this.handleTaskClick}/>
            </div>    
        </div>
        
    )}
}

const mapDispatchToProps = dispatch => {
    return {
        setData: (selectedObj) => dispatch({type: actionTypes.SHOW_BOX,selectedObj}),
    }
};

export default connect(
    null,
    mapDispatchToProps
  )(AddNewTaskComponent);
  
