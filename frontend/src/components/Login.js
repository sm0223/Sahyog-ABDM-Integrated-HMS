import React from 'react';
import {Card, CardBody, CardFooter, CardTitle, Container, Form, FormGroup, Input, Label} from "reactstrap";

const Login = ({handleLogin, errorMessage}) => {

  return (
      <Container style={{marginTop:100,width:"30%"}}>
        <Card style={{backgroundColor: "#212529"}}>
          <Form onSubmit={handleLogin}>
            <CardBody style={{color:"#cccccc"}}>
              <h1 style={{color:"#cccccc"}} align="center"> Login </h1>
              <hr/>
              <FormGroup className="mb-3">
                <Label><b>User Name</b></Label>
                <Input type="text" placeholder="Enter Username" name="username" id="username"/>
              </FormGroup>

              <FormGroup className="mb-3">
                <Label><b>Password</b></Label>
                <Input type="password" placeholder="Password" name="password" id="password"/>
              </FormGroup>
              <FormGroup check className="mb-3">
                <Input type="checkbox"/>
                <Label><b>Remember Me</b></Label>
              </FormGroup>
              {errorMessage && <p style = {{
                color:"red"}}> {errorMessage}</p>}
              <Input type="submit" className="btn btn-primary" type="submit"/>
            </CardBody>
          </Form>
        </Card>
      </Container>
  );
};

export default Login;
