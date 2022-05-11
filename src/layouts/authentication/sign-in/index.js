/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { useMutation, useQuery, gql } from "@apollo/client";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useSoftUIController, setTags, setRefetch } from "context/index";

const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
export const MY_TAGS = gql`
  query Query {
    getMyTags {
      _id
      name
      color
    }
  }
`;

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [dispatch] = useSoftUIController();
  const navigate = useNavigate();

  const cookies = new Cookies();

  const [submitToLogin] = useMutation(LOGIN);
  const onSubmitToLogin = async () => {
    try {
      const {
        data: {
          login: { token },
        },
      } = await submitToLogin({
        variables: {
          username: userName,
          password: password,
        },
      });
      if (token) {
        cookies.set("token", token);
				window.location.href="/dashboard"
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <CoverLayout title="" description="" image={curved9}>
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              نام کاربری
            </SuiTypography>
          </SuiBox>
          <SuiInput
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type="email"
            placeholder="نام کاربری"
          />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              رمز عبور
            </SuiTypography>
          </SuiBox>
          <SuiInput
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="رمز عبور"
          />
        </SuiBox>
        <SuiBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SuiTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;به خاطر بسپار
          </SuiTypography>
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton
            onClick={() => {
              onSubmitToLogin();
            }}
            variant="gradient"
            color="info"
            fullWidth
          >
            ورود
          </SuiButton>
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiTypography variant="button" color="text" fontWeight="regular">
            &apos;اگر شما حساب کاربری دارید ؟{" "}
            <SuiTypography
              component={Link}
              to="/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              ثبت نام
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
}

export default SignIn;
