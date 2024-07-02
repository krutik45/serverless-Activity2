/* eslint-disable */

import React, { FormEvent, useContext, useEffect, useState } from "react";
import {
  Container,
  CardBody,
  LogoImage,
  Title,
  Form,
  Input,
  SignInButton,
} from "./SigninStyles";

import logo from "../assets/logos/Logo.png";
import { useNavigate } from "react-router-dom";
import { Services } from "../../services/Services";

const Signin: React.FC = () => {
  let navigate = useNavigate();
  const services = new Services();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let loadings = false;
  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await services.signIn({
        email: email,
        password: password,
      });
      console.log("Login response:", res);
      if (res.status === 200) {
        setLoading(false);
        navigate("/home");
      } else if (res.status === 401) {
        setLoading(false);
        window.alert("Wrong email or password");
      }
    } catch (err) {
      console.error("Error signing in:", err);
      setLoading(false);
      window.alert("An error occurred while signing in");
    }
  };

  return (
    <Container>
      <CardBody>
        <Title>Sign In</Title>
        <Form onSubmit={handleSignIn}>
          <Input
            type="email"
            placeholder="Enter your email"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
          />
          <SignInButton type="submit">Sign In</SignInButton>
        </Form>
      </CardBody>
    </Container>
  );
};

export default Signin;
