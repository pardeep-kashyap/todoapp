import  React  from 'react';
import  TaskPreviewComponent  from '../taskPreviewComponent/taskPreviewComponent';
import  AddNewTaskComponent  from './../addNewTaskComponent/addNewTaskComponent';
import HeaderMenuComponent from './../headerMenuComponent/headerMenuComponent';
import classes from './contentSectionComponent.scss';

class ContentSectionComponent extends React.Component{

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }

    render() {
      return (
                <div className={classes.contentSection}>
                <HeaderMenuComponent activateMenu={this.props.activateMenu} />
                <div className={classes.taskSection}>
                <AddNewTaskComponent activateMenu={this.props.activateMenu}/>
                <TaskPreviewComponent/>
                </div>
                </div>    
    )}
}

export { ContentSectionComponent };