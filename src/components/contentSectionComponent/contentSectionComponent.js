import  React  from 'react';
import { AddNewTaskComponent } from './../addNewTaskComponent/addNewTaskComponent';

class ContentSectionComponent extends React.Component{

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }

    render() {
      return (
        <div style={{width:'100%'}}>
           <AddNewTaskComponent  activateMenu={this.props.activateMenu}/>
        </div>
    )}
}

export { ContentSectionComponent };