import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
`;

export const CardBody = styled.div`
  text-align: center;
`;

export const LogoImage = styled.img`
  width: 100px;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  width: 100%;
`;

export const Input = styled.input`
  width: 80%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #d9d9d9;
`;

export const SignInButton = styled.button`
  width: 87%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  background-color: #78b2e7;
  color: #fff;
  border: none;
  &:hover {
    background-color: #1d85e4;
  }
`;
