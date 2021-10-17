import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import usersApi from "../api/users";
import authApi from "../api/auth";

import Screen from "../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
import { useState } from "react";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

function RegisterScreen() {
  const auth = useAuth();
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const [registerFailed, setRegisterFailed] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    try {
      const result = await registerApi.request(userInfo);

      if (!result.ok) {
        setRegisterFailed(true);
        if (result.data) setError(result.data.error);
        else {
          setError("An unexpected error occurred.");
          console.log(result);
        }
        return;
      }
      setRegisterFailed(false);
      const { data: authToken } = await loginApi.request(
        userInfo.email,
        userInfo.password
      );
      auth.logIn(authToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={[styles.container, { paddingTop: 15 }]}>
        <ErrorMessage visible={registerFailed} error={error} />
        <Form
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton
            style={
              (registerApi.loading || loginApi.loading) && {
                elevation: 0,
              }
            }
            title="Register"
          />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});

export default RegisterScreen;
