import React from 'react';
import { useNavigate } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import gService from "../services/general_services";
import authService from "../services/authService";
import {Button, Container, Form} from "react-bootstrap";

const Login = ({handleLogin, loginPageData}) => {


  return (
      <Container style={{padding:20}}>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>
          {loginPageData && <p style = {{color:"red"}}> {loginPageData}</p>}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
  );
};

export default Login;
