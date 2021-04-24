import Axios from 'axios';
import React from 'react';
import { Icon, Button, Tooltip } from '@material-ui/core';
import classes from './addNewTaskComponent.scss';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index-action';
import { timeSinceText } from './../../utils/util';
import { useState, useEffect } from 'react';

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const ListItem = ({
    index,
    value,
    timeSince,
    deleteTask,
    handleItemClick,
    setPreviewData,
}) => (
    <li
        onClick={() => setPreviewData(index)}
        className={classes.addnewListItem}
    >
        <FormGroup row>
            <FormControlLabel
                className={`${value.status ? classes.strike : ''}`}
                control={
                    <GreenCheckbox
                        checked={value.status}
                        onChange={() => handleItemClick(index, 'status')}
                        name="checkedG"
                    />
                }
                label={value.taskName}
            />
        </FormGroup>
        <span className={classes.timeAgo}>
            <b>Created</b> {timeSince(new Date(value.created_at))} ago
        </span>

        <Tooltip title={`${value.important ? '' : 'Not '}Important`} arrow>
            <span
                onClick={() => handleItemClick(index, 'important')}
                className={`${classes.star} ${
                    value.important ? classes.important : ''
                }`}
            >
                <Icon>grade</Icon>
            </span>
        </Tooltip>
        <Tooltip title="Delete Task" arrow>
            <Icon
                className={classes.materialIcons}
                onClick={() => deleteTask(index)}
            >
                delete
            </Icon>
        </Tooltip>
    </li>
);

const List = ({
    itemList,
    timeSince,
    deleteTask,
    handleItemClick,
    setPreviewData,
}) => (
    <ul>
        {itemList.map((item, index) => (
            <ListItem
                key={index}
                setPreviewData={setPreviewData}
                index={index}
                timeSince={timeSince}
                value={item}
                deleteTask={deleteTask}
                handleItemClick={handleItemClick}
            />
        ))}
    </ul>
);

const AddNewTaskComponent = (props) => {
    const [taskName, setTaskName] = useState(props.taskName);

    useEffect(() => {
        const loginData = JSON.parse(localStorage.getItem('user'));
        let email = loginData.email;
        props.fetchTasks(email);
        console.log('mount it!');
    }, []);

    const addNewInList = (event) => {
        event.preventDefault();
        setTaskName(props.taskName);
        const loginData = JSON.parse(localStorage.getItem('user'));
        let email = loginData.email;
        props.saveNewTask({ taskName: props.taskName, email: email });
    };

    const deleteTask = (index) => {
        props.deleteTask(props.taskList[index]._id);
    };

    const setPreviewData = (index) => {
        props.setPreview(props.taskList[index]);
    };

    const handleItemClick = (index, key) => {
        props.taskList[index][key] = !props.taskList[index][key];
        props.updateTask(props.taskList[index]);
    };

    return (
        <div className={classes.addnewContainer}>
            <div className={classes.textBoxSection}>
                <form onSubmit={addNewInList} autoComplete="off">
                    <TextField
                        id="filled-multiline-static"
                        label="Add New Task"
                        variant="outlined"
                        value={props.taskName}
                        onChange={(e) =>
                            props.setPreviewTextBox(e.target.value)
                        }
                        className={classes.MuiTextFieldRoot}
                    />
                    <Button
                        className={classes.MuiButtonBaseRootButton}
                        type="submit"
                        variant="contained"
                        startIcon={<Icon>add</Icon>}
                    >
                        Start !
                    </Button>
                </form>
            </div>
            <div className={classes.taskList}>
                <List
                    setPreviewData={setPreviewData}
                    itemList={props.taskList || []}
                    timeSince={timeSinceText}
                    deleteTask={deleteTask}
                    handleItemClick={handleItemClick}
                />
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPreview: (selectedObj) =>
            dispatch(actions.setTaskPreview(selectedObj)),
        saveNewTask: (payload) => dispatch(actions.saveNewTask(payload)),
        fetchTasks: (email) => dispatch(actions.fetchTasks(email)),
        deleteTask: (taskId) => dispatch(actions.deleteTask(taskId)),
        setPreviewTextBox: (text) => dispatch(actions.setPreviewTextBox(text)),
        updateTask: (task) => dispatch(actions.updateTask(task)),
    };
};

const mapStateToProps = (state) => {
    return {
        taskList: state.taskList ?? [],
        taskName: state.taskNameTextBox ?? '',
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddNewTaskComponent);
