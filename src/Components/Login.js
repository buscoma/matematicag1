import React, { useContext, useState } from "react";
// import { Redirect } from "react-router";
import { useHistory, Redirect } from "react-router-dom";
import app from "../base.js";
import { AuthContext } from "./Auth.js";
import { TextField, Button, Dialog, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {TitleH2, TextBold} from '../css/BaseStyle.js';
import {paperScrollPaper, buttom, paper, logo, logoClose, input} from '../css/BaseLineDialog';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import RegistrarLogo from '../Images/jugar.svg';
import CloseLogo from '../Images/interfaz.svg';
/*
const useStyles = makeStyles({
root: {
  display: "flex",
  flexWrap: "wrap",
},
textField: {
  alignSelf: "center",
  width: "50ch",
},
button: {
  alignSelf: "center",
  justify: "center",
},
dialog: {
},
});*/

const useStyles = makeStyles({
  root:{
    padding:'1rem',
  },
  paperScrollPaper,
  paper,
  logo,logoClose,
  TitleH2,
  TextBold,
  buttom,
  input
});

export default function Login(props){
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const handleSubmit = () => {
      console.log({email: values.email, password: values.password})  
      try {
        app.auth().signInWithEmailAndPassword(values.email, values.password);
        history.push("/landing_page");
      } catch (error) {
        alert(error)
      }
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleRegister = () => {
    props.show();
    props.showSignUp();
  };
  const classes = useStyles(props);
  const {currentUser} = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/landing_page" />;
  }
  return (

      <Dialog open={true}  classes={classes} onBackdropClick={props.show}>
        <form onSubmit={() => handleSubmit()} noValidate autoComplete="on">
        <Container  >
            <Grid container spacing={2}   alignItems="center" >
              <Grid item xs={12} style={{textAlign:'right'}} >
                <img src={CloseLogo} className={classes.logoClose} alt="React Logo" />
              </Grid>
              <Grid item xs={12} style={{textAlign:'center'}} >
                <img src={RegistrarLogo} style={{height:'15vh',width:'15vh'}} alt="React Logo" />
              </Grid>
              <Grid item xs={12} style={{textAlign:'center'}} >
                <Typography className={classes.TitleH2 + " " + classes.TextBold}  >Registrate para jugar!!</Typography> 
              </Grid>
              <Grid item xs={12} justify="strech" alignItems="center" style={{textAlign:'center'}}>
                <TextField
                className={classes.textField}
                value={values.email}
                onChange={handleChange("email")}
                fullWidth
                placeholder="Email"
              />
              </Grid>
              <Grid item xs={12} justify="center" alignItems="center" style={{textAlign:'center'}}>
                <TextField
                className={classes.input}
                value={values.password}
                onChange={handleChange("password")}
                type="password"
                fullWidth
                autoComplete="current-password"
                placeholder="Password"
              />
              </Grid>
              <Grid item xs={12} justify="center" alignItems="center" style={{textAlign:'center'}}>
                <Button
                className={classes.buttom}
                variant="outlined"
                type="submit"
                color="primary"
              >
                Log in
              </Button>
              </Grid>
              <Grid item xs={12} justify="center" alignItems="center" style={{textAlign:'center'}}>
                <Typography className={classes.TitleH2 + " " + classes.TextBold}>  Not registered yet? </Typography>
              </Grid>
              <Grid item xs={12} justify="center" alignItems="center" style={{textAlign:'center'}}>
                <Button
                  className={classes.buttom}
                  variant="outlined"
                  onClick={() => handleRegister()}
                  color="secondary"
                >
                  Register
                </Button>
              </Grid>
              
            </Grid>
          </Container>
        </form>
      </Dialog>

  );
}
