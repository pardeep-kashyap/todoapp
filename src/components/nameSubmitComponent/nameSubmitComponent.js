import React from 'react';
import { TextField,  Button } from '@material-ui/core'
import './nameSubmitComponent.scss'
import { useHistory } from "react-router-dom";



function NameSubmitComponent (){
        const  history = useHistory();  
        const userInformation = {
            name:'',
            email:''
        }  
        
        function handleSubmit () {
           window.userInformation=userInformation;
           if(userInformation.name !== '' && userInformation.email !== ''){
             history.push('/home')
           }
        }
        
        function onChangeNameText(event){
            userInformation.name=event.target.value;
        }

        function onChangeEmailText(event){
            userInformation.email=event.target.value;
        }
        
        return (<div className="NameSubmitComponentClass">
        <form onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Name" onChange={onChangeNameText} variant="outlined" />
        <TextField id="outlined-basic" label="Email" onChange={onChangeEmailText} variant="outlined" />
        <Button onClick={handleSubmit} variant="contained" >
            Start !
        </Button>
        </form>        
        </div>)
    
}

export {NameSubmitComponent}