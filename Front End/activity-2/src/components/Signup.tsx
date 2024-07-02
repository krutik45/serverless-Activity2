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
} from "./SignupStyles";

import logo from "../assets/logos/Logo.png";
import { useNavigate } from "react-router-dom";
import { Services } from "../services/Services";

const Signup: React.FC = () => {
  let navigate = useNavigate();
  const services = new Services();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let loadings = false;
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await services.signUp({
        email: email,
        password: password,
      });
      console.log("res", res);
      console.log("res.data.statusCode", res.data.statusCode);
      if (res.status === 200) {
        navigate("/login");
      }
      loadings = true;
    } catch (err) {
      console.log("error", err);
      setLoading(false);
      loadings = false;
    }
  };

  return (
    <Container>
      <CardBody>
        <Title>Sign Up</Title>
        <Form onSubmit={handleSignUp}>
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
          <SignInButton type="submit">Sign Up</SignInButton>
        </Form>
      </CardBody>
    </Container>
  );
};

export default Signup;
