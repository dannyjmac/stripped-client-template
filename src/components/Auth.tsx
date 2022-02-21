import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
`;

const Text = styled.p`
  margin-bottom: 10px;
`;

const Toggle = styled.div`
  margin-top: 20px;
  cursor: pointer;
`;

export const Auth = ({ handleUserSession }: any) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState<string>("danramac");
  const [email, setEmail] = useState<string>("dr.mcgrane@gmail.com");
  const [password, setPassword] = useState<string>("passwordtest");

  const handleSignup = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_AUTH_API_BASE_URL}/signUp`,
        {
          email,
          username,
          password,
        }
      );

      if (data.success) {
        handleUserSession(data.token);
      }

      console.log({ data });
    } catch (err) {
      console.log({ err });
    }
  };

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_AUTH_API_BASE_URL}/login`,
        {
          email,
          password,
        }
      );

      if (data.success) {
        handleUserSession(data.token);
      }
    } catch (err) {
      console.log({ err });
    }
  };

  if (isSignUp) {
    return (
      <Container>
        <Text>Sign Up</Text>
        <Input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          value={password}
        />
        <button onClick={() => handleSignup()}>SUBMIT</button>
        <Toggle onClick={() => setIsSignUp(!isSignUp)}>Have an account?</Toggle>
      </Container>
    );
  }

  return (
    <Container>
      <Text>Login</Text>
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        value={password}
      />
      <button onClick={() => handleLogin()}>SUBMIT</button>
      <Toggle onClick={() => setIsSignUp(!isSignUp)}>
        Don't have an account?
      </Toggle>
    </Container>
  );
};
