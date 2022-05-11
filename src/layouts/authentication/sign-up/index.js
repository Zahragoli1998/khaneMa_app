

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import curved6 from "assets/images/curved-images/curved14.jpg";
import { useMutation, useQuery, gql } from "@apollo/client";
import Cookies from "universal-cookie";
import { MY_TAGS } from "../sign-in";
import { useSoftUIController, setTags, setRefetch } from "context/index";
const SIGN_UP = gql`
  mutation Mutation($name: String!, $username: String!, $password: String!) {
    signup(name: $name, username: $username, password: $password) {
      token
    }
  }
`;

function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [controller, dispatch] = useSoftUIController();
  const handleSetAgremment = () => setAgremment(!agreement);
  const cookies = new Cookies();
  const [submit] = useMutation(SIGN_UP);

  const onSubmit = async () => {
    try {
      const {
        data: {
          signup: { token },
        },
      } = await submit({
        variables: {
          name: name,
          username: userName,
          password: password,
        },
      });
			if (token) {
				console.log("token ti sign" ,token);
				cookies.set("token", token);
				window.location.href="/dashboard"
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BasicLayout title="خانه ما" description="" image={curved6}>
      <Card>
        <SuiBox p={3} mb={1} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            ثبت نام از طریق
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={2}>
          <Socials />
        </SuiBox>
        <Separator />
        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiInput onChange={(e)=>{setName(e.target.value)}} placeholder="نام" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput onChange={(e)=>{setUserName(e.target.value)}} placeholder="نام کاربری" />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="رمزعبور" />
            </SuiBox>
            <SuiBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                شرایط وقوانین حریم خصوصی
              </SuiTypography>
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;را می پذیرم&nbsp;
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton onClick={()=> onSubmit()} variant="gradient" color="dark" fullWidth>
                ثبت نام
              </SuiButton>
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
              <SuiTypography variant="button" color="text" fontWeight="regular">
                اگر ثبت نام کرده اید؟&nbsp;
                <SuiTypography
                  component={Link}
                  to="/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  ورود
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
