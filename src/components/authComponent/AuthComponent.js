import React from 'react';
import { TextField,  Button, Link, Snackbar } from '@material-ui/core'
import { connect } from 'react-redux';
import Fade from '@material-ui/core/Fade';
import classes from './AuthComponent.scss';
import * as actions from './../../store/actions/action_index';
import { useHistory } from "react-router-dom";


function AuthComponent (props){
        let history = useHistory();
        const [state, setState] = React.useState({
            open: false,
            Transition: Fade,
            message:''
          });
        

        const userInformation = {
            email:'',
            password:''
        }  
        
        function authStart () {
            if(userInformation.email !== '' && userInformation.password !== ''){
                //   Axios.post(`user/login`,userInformation).then(success=>{
                //      console.log(success);
                //      if(success.data.status === 'success'){
                //         localStorage.setItem("user",JSON.stringify(success.data.loginDetail))
                //         setState({
                //             message:''
                //         });
                //         handleClick(Fade,'Login Successful');
                //         setTimeout(()=>{
                //             history.push('/home')
                //         },500)
                //      }else{
                //         setState({
                //             message:''
                //         });
                //         handleClick(Fade,'Login Failed')

                //      }
                //  }).catch(error=>{
                //      console.log(error);
                //  })
                props.AuthStart(userInformation.email,userInformation.password,history)
            }
         }
        
        function onChangeNameText(event){
            userInformation.email=event.target.value;
        }

        function onChangeEmailText(event){
            userInformation.password=event.target.value;
        }
      
        return (<div className={classes.AuthComponentClass}>
        <form  onSubmit={authStart}>
        <TextField id="outlined-basic" label="email" onChange={onChangeNameText} variant="outlined" />
        <TextField id="outlined-basic" type="password" label="Password" onChange={onChangeEmailText} variant="outlined" />
        <Link>
            Forgot password ?
        </Link>
        <Button onClick={authStart} variant="contained" >
            Login            
        </Button>
        </form>    
        <Snackbar
        open={state.open}
        message={state.message}
      />     
        </div>)
    
}
const mapDispatchToProps = dispatch => {
    return {
        AuthStart:(email,password,history)=>dispatch(actions.authStart(email,password,history))
    }
}

export default connect(null,mapDispatchToProps)(AuthComponent)