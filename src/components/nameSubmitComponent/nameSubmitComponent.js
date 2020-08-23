import React from 'react';
import { TextField,  Button, Link, Snackbar } from '@material-ui/core'
import './nameSubmitComponent.scss'
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import Fade from '@material-ui/core/Fade';



function NameSubmitComponent (){
        const  history = useHistory();  
        const [state, setState] = React.useState({
            open: false,
            Transition: Fade,
            message:''
          });
        

        const userInformation = {
            name:'',
            email:''
        }  
        
        function handleSubmit () {
            if(userInformation.username !== '' && userInformation.password !== ''){
                  Axios.post(`user/login`,userInformation).then(success=>{
                     console.log(success);
                     if(success.data.status){
                        localStorage.setItem("user",JSON.stringify(success.data.loginDetail))
                        setState({
                            message:''
                        })
                        handleClick(Fade,'Login Successful');
                        setTimeout(()=>{
                            history.push('/home')
                        },500)
                     }else{
                        setState({
                            message:''
                        });
                        handleClick(Fade,'Login Failed')

                     }
                 }).catch(error=>{
                     console.log(error);
                 })
            }
         }
        
        function onChangeNameText(event){
            userInformation.name=event.target.value;
        }

        function onChangeEmailText(event){
            userInformation.email=event.target.value;
        }


        
        function handleClick (Transition,message) {
            setState({
                open: true,
                Transition,
                message
              });
        };
      
        return (<div className="NameSubmitComponentClass">
        <form  className="w-16 md:w-32 lg:w-48" onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Name" onChange={onChangeNameText} variant="outlined" />
        <TextField id="outlined-basic" type="password" label="Password" onChange={onChangeEmailText} variant="outlined" />
        <Link>
            Forgot password ?
        </Link>
        <Button onClick={handleSubmit} variant="contained" >
            Login            
        </Button>
        </form>    
        <Snackbar
        open={state.open}
        message={state.message}
      />     
        </div>)
    
}

export {NameSubmitComponent}