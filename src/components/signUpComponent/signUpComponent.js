import React from 'react';
import './signUpComponent.scss';
import { Button,TextField, InputAdornment } from '@material-ui/core';
import signupleft  from './../assets/svg/signupleft.svg'
import signupbtnRight  from './../assets/svg/signupbtnRight.svg'
import Axios from 'axios';
 

class SignUpComponent extends React.Component{
    constructor(){
        super();
        this.state={
            signUpForm:{
                firstName:{
                    label:'First Name',
                    type:'text',
                    variant:'outlined',
                    value:''
                },
                lastName:{
                    label:'Last Name',
                    type:'text',
                    variant:'outlined',
                    value:''
                },
                username:{
                    label:'Username',
                    type:'text',
                    variant:'outlined',
                    value:'',
                    helperText:'',
                    error:false
                },
                email:{
                    label:'Email',
                    type:'text',
                    variant:'outlined',
                    value:'',
                },
                password:{
                    label:'Password',
                    variant:'outlined',
                    type:'password',
                    value:'',
                }
            }
        }
    }

    onChangeNameText =(control,event)=>{
        const newValue =event.target.value
        const { signUpForm } = this.state;
        signUpForm[control].value=newValue;
        this.setState({
            signUpForm
        });   
        if(control === 'username'){
            this.onUsernameChange(newValue,control)   
        }
    }

    onUsernameChange=(username,control)=>{
        const { signUpForm } = this.state;
        signUpForm[control].helperText='';
        Axios.get(`user/find/username?username=${username}`).then(success=>{
            console.log(success);
            signUpForm[control].helperText=success.data.message;
            signUpForm[control].error=(success.data.status=== 'success')?false:true;
            this.setState({
                signUpForm
            });  

        }).catch(error=>{
            signUpForm[control].helperText=error.message;
            signUpForm[control].error=true;
            this.setState({
                signUpForm
            });  
            console.log(error);
        })
    }

    createUser=(evt)=>{
        evt.preventDefault();
        const { signUpForm } = this.state;
        const requestObj ={}
         Object.keys(signUpForm).forEach((key)=>requestObj[key]=signUpForm[key].value);
         Axios.post(`user/create`,requestObj).then(success=>{
            console.log(success);

        }).catch(error=>{
            console.log(error);
        })
    }

    render(){

        return ( 
            <div className="signUpComponent">
            <div className="bottom-end">
               <img src={signupleft} alt="Explore "/>
                <img src={signupbtnRight} alt="Explore "/>
            </div>
            <div className="center">
                 <div className="signup-form">
                     <h1>Sign up for your account</h1>
                     <form onSubmit={this.createUser}>
                     {
                         Object.keys(this.state.signUpForm).map( (control,index)=> <TextField name={control} key={index} onChange={(event)=>this.onChangeNameText(control,event)} {...this.state.signUpForm[control]} />)
                     }
                        <Button type="submit" variant="contained" >
                            Sign Up           
                        </Button>
                    </form>        
                 </div>
            </div>
        </div>
        )
    }
}

export default SignUpComponent