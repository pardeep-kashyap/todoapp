import  React  from 'react';
import { Icon, Button } from '@material-ui/core';
import './addNewTaskComponent.scss'
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import HeaderMenuComponent from './../headerMenuComponent/headerMenuComponent';

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);


const ListItem = ({index,value,onClick,deleteTask,handleTaskClick}) =>(
    <li onClick={onClick} className="addnew-List-item">
        <FormGroup row>
        <FormControlLabel
        className={`${value.checked?'strike':''}`}
        control={<GreenCheckbox
            checked={value.checked}
            onChange={()=>handleTaskClick(index)}
            name="checkedG"  />}
        label={value.taskName}
      />
        </FormGroup>
 
        <Icon onClick={() => deleteTask(index)} >delete</Icon>

    </li>
)

const List = ({itemList,onItemClick,deleteTask,handleTaskClick}) =>(
    <ul>
        {itemList.map((item, index) => <ListItem key={index} index={index} value={item} onClick={onItemClick} deleteTask={deleteTask} handleTaskClick={handleTaskClick} />)}
    </ul>
)


class AddNewTaskComponent extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){        
        super(props);
        this.state = {
            taskName: '',
            task:{}
          };
        this.state.task[props.activateMenu]=[];
        this.addNewInList = this.addNewInList.bind(this);
        this._taskNameTextFieldChange = this._taskNameTextFieldChange.bind(this);
        this.deleteTask=  this.deleteTask.bind(this);
        this.handleTaskClick = this.handleTaskClick.bind(this);
        
    }

    addNewInList (event){
        event.preventDefault();
        const taskList= this.state.task[this.props.activateMenu] || [];
        if(this.state.taskName === ''){
            return;
        }
        const { task }=  {...this.state} 
        task[this.props.activateMenu]=[...taskList,{taskName:this.state.taskName,checked:false}];
        this.setState({
            task,
            taskName:''
        });
    }
    
    deleteTask(index){
        const state= this.state;
        state.task[this.props.activateMenu].splice(index,1);
        this.setState(state);
    }

    _taskNameTextFieldChange(e) {
            this.setState({
                taskName: e.target.value
            });    
    }

    
    handleTaskClick(index){
        const state= this.state;
        state.task[this.props.activateMenu][index].checked=!state.task[this.props.activateMenu][index].checked;
        this.setState(state);
    }

    render() {
       return (
        <div className="addnew-container" >
            <HeaderMenuComponent activateMenu={this.props.activateMenu} />
            <div className="text-box-section">
            <form onSubmit={this.addNewInList} autoComplete="off" >
                <TextField
                id="filled-multiline-static"
                label="Add New Task"
                variant="outlined"
                value={this.state.taskName}
                onChange={this._taskNameTextFieldChange}
                />
                <Button type="submit" variant="contained" startIcon={<Icon>add</Icon>} >
                Start !
            </Button>
            </form>
            </div>
            <div className="task-list">
              <List itemList={this.state.task[this.props.activateMenu] || []} onItemClick={this.handleItemClick}  deleteTask={this.deleteTask} handleTaskClick={this.handleTaskClick}/>
            </div>    
        </div>
        
    )}
}

export { AddNewTaskComponent };