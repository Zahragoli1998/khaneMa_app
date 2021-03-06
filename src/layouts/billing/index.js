// Soft UI Dashboard React components
import Map from "./components/Map";
import Box from "@mui/material/Box";
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import DeleteExpense from "./DeleteExpense";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSoftUIController } from "context";
import LimitTags from "./components/AutoComplete";
import { Alert, Button, Card, Grid, Icon, Snackbar} from "@mui/material";
import SuiTypography from "components/SuiTypography";
import JalaliDatePicker from "./components/DatePicker";
import TimelineItem from "examples/Timeline/TimelineItem";
import { useMutation, useQuery, gql } from "@apollo/client";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { newDate } from "date-fns-jalali";

const ADD_EXPENSE = gql`
  mutation Mutation($data: ExpenseInfo!) {
    create_expense(data: $data) {
      status
      msg
    }
  }
`;

const DATA = gql`
  query Query {
    getMyTags {
      _id
      name
      color
    }
    getMyExpenses {
      _id
      amount
      tags {
        _id
        name
        color
      }
      geo {
        lat
        lon
      }
      date
      address {
        MunicipalityZone
        Neighbourhood
        FormattedAddress
        Place
      }
    }
  }
`;

function Billing() {
  const [date, setDate] = useState(null);
  const [addExpense] = useMutation(ADD_EXPENSE);
  const [myExpense, setMyExpense] = useState([]);
  const [tags, setTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [successed, setSuccessed] = useState(false);
  const [failed, setFaild] = useState(false);
  const [tagIsSelected, setTagIsSelected] = useState([]);
  const { loading, error, data, refetch } = useQuery(DATA);
  const [location, setLocation] = useState({
    lat: 35.687195,
    lng: 51.388413,
  });

  const onSubmitToAddExpense = async () => {
    try {
      const {
        data: {
          create_expense: { status },
        },
      } = await addExpense({
        variables: {
          data: {
            amount: Number(expenseAmount),
            geo: {
              lat: Number(location.lat),
              lon: Number(location.lng),
            },
            tags: tagIsSelected,
            date: new Date(date).toISOString(),
            address: {
              MunicipalityZone: 4,
              Neighbourhood: "?????????? ????????",
              FormattedAddress: "???????????????? ????????",
              Place: "?????? ??????????",
            },
          },
        },
      });
      console.log(status);
      if (status === 200) {
				setSuccessed(true)
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
			const newArray = [
				...data.getMyExpenses.map((item) => {
					const newDate = new Date(item.date)
					return {
						...item,
						newDate: newDate.toLocaleDateString('fa-IR',{year:'numeric',month:'numeric',day:'numeric'}),
					};
				}),
			];
			const sortableArray = [
				...newArray.sort(function (a, b) {
					return new Date(b.date) - new Date(a.date);
				}),
			];
      setMyExpense([...sortableArray])
      setTags([...data.getMyTags]);
    }
  }, [data]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "70vw", minHeight: "40vw" }}>
        <SuiBox mt={4}>
          <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SuiTypography variant="h6">?????????? ????</SuiTypography>
            <AddIcon sx={{ cursor: "pointer" }} onClick={() => setShowModal(!showModal)} />
          </SuiBox>
          {showModal ? (
            <>
              <Grid
                container
                spacing={3}
                sx={{
                  padding: "0 50px",
                  zIndex: "300",
                }}
              >
                <Grid item xs={12} sm={6} xl={3}>
                  <SuiInput
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    value={expenseAmount}
                    placeholder="????????"
                    label="nnnnnnn"
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={4}>
                  <JalaliDatePicker setDate={setDate} />
                </Grid>
                <Grid item xs={12} sm={6} xl={3}>
                  <LimitTags tags={tags} setTagIsSelected={setTagIsSelected} />
                </Grid>
              </Grid>
              <Map setLocation={setLocation} />
              <SuiBox display="flex" justifyContent="flex-end" margin="0 10px">
                <Button
                  size="large"
                  className="btn-Expense"
                  startIcon={<Icon>add</Icon>}
                  onClick={() => onSubmitToAddExpense()}
                >
                  ???????????? ?????????? ????????
                </Button>
              </SuiBox>
            </>
          ) : null}
          <Card className="h-100">
            <SuiBox p={2}>
              {myExpense.map((item) => {
								const newDate = new Date(item.date)
                return (
                  <Box key={item._id} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <TimelineItem
                      color="info"
                      icon="shopping_cart"
                      title={`$${item.amount}`}
                      dateTime={newDate.toLocaleDateString('fa-IR',{year:'numeric',month:'numeric',day:'numeric'})}
                      description={item.tags}
                    />
                    <DeleteExpense id={item._id} refetch={refetch} />
                  </Box>
                );
              })}
            </SuiBox>
          </Card>
        </SuiBox>
			  <Snackbar open={successed} autoHideDuration={2000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          ???? ???????????? ?????? ???? 
        </Alert>
      </Snackbar>
      </Card>
    </DashboardLayout>
  );
}

export default Billing;
