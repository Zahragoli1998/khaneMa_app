import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";
import Edit from "@mui/icons-material/Edit";
import breakpoints from "assets/theme/base/breakpoints";
import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";
import UplodImage from "../UplodImage";
import SuiInput from "components/SuiInput";
import { gql, useMutation } from "@apollo/client";
import { ToggleButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const EDIT_ME = gql`
  mutation Mutation($name: String!, $img: Upload) {
    editMe(name: $name, img: $img) {
      status
      msg
    }
  }
`;

function Header({ userInfo,refetch }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
	const [name,setname] =useState('')
	const [ImgUrl,setImgUrl] = useState(null)
  const [submit] = useMutation(EDIT_ME);
  const onSubmitToEditMe = async () =>{
		try {
			const {data:{editMe:{status}}} = await submit({
				variables:{
					name:name,
					img:ImgUrl
				}
			})
			console.log(status);
			if (status === 200) {
				refetch()
			}
		} catch (error) {
			console.log(error);
		}
	}
  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }
    if (userInfo) {
      setUser({ ...userInfo.me });
    }
    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation, userInfo]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <SuiBox position="relative">
      <DashboardNavbar absolute light />
      <SuiBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <UplodImage setImgUrl={setImgUrl}/>
          </Grid>
          <Grid item>
            <SuiBox height="100%" mt={0.5} lineHeight={1}>
              <SuiTypography variant="h5" fontWeight="medium">
                {user.username}
              </SuiTypography>
              <SuiTypography variant="button" color="text" fontWeight="medium">
                {user.name}
              </SuiTypography>
            </SuiBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}
              >
                <Tab label="ویرایش" icon={<Edit />} onClick={() => {setIsOpen(!isOpen);}} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        {isOpen ? (
          <SuiBox component="form" role="form" sx={{ display: "flex", gap: "1vw", alignItems:'flex-end' }}>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography component="label" variant="caption" fontWeight="bold">
                  نام
                </SuiTypography>
              </SuiBox>
              <SuiInput
                onChange={(e) => {
                  setname(e.target.value);
                }}
                placeholder={user.name}
              />
            </SuiBox>
						<ToggleButton
						sx={{marginBottom:'16px'}}
                  value="check"
                  onClick={() => {
                    onSubmitToEditMe();
                  }}
                >
                  <CheckIcon />
                </ToggleButton>
          </SuiBox>
        ) : null}
      </Card>
    </SuiBox>
  );
}

export default Header;
