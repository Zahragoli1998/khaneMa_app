import moment from "jalali-moment";
import Footer from "examples/Footer";
import Grid from "@mui/material/Grid";
import Cookies from "universal-cookie";
import SuiBox from "components/SuiBox";
import { useEffect, useState } from "react";
import { useSoftUIController } from "context";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import typography from "assets/theme/base/typography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import Slider from "components/Slider";
const CHART_DATA = gql`
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

function Dashboard() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const token = cookies.get("token");
  const [myExpense, setMyExpense] = useState([]);
	const [ChartData,setChartData] = useState({})
  const { loading, error, data } = useQuery(CHART_DATA);
	
  const onSubmitToMyExpense = () => {
		if (data) {
			setChartData({...data})
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
					return new Date(a.date) - new Date(b.date);
				}),
			];
			sortableArray.map((item)=>{
				let listItem = myExpense.find(e => e.x === item.newDate)
				if(!listItem){
					myExpense.push({"x":item.newDate , "y":item.amount})
				}
				else{
					listItem.y = listItem.y + item.amount
				}
			})
		}
  };

  const gradientLineChartData = {
    datasets: [
      {
        label: "هزینه",
        color: "info",
        data: myExpense,
      },
    ],
  };

  useEffect(() => {
    onSubmitToMyExpense();
    if (!token) {
      navigate("/sign-in");
    }
  }, [data,token]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "هزینه ها" }}
                count={data ? data.getMyExpenses.reduce((acc, item) => acc + item.amount, 0) : null}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
          </Grid>
          <SuiBox>
            <Grid container py={3}>
              <Slider />
            </Grid>
          </SuiBox>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <DefaultDoughnutChart title=" " chart={reportsBarChartData} chartData={ChartData} />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart title="گزارش هزینه ها" height="20.25rem" chart={gradientLineChartData} />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Dashboard;
