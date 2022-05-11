
import { useMemo } from "react";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import configs from "examples/Charts/DoughnutCharts/DefaultDoughnutChart/configs";
import {gql,useQuery} from "@apollo/client"

function DefaultDoughnutChart({ title, description, height,chartData }) {
	const labels= []
	const numberOfTag = []
	const colors = []
	const list = []
	if (chartData.getMyExpenses) {
		chartData.getMyExpenses.map((expense)=>{
			return expense.tags.map((tag)=>{
				let listItem = list.find((item) => item.name === tag.name);
				if (!listItem) {
							list.push({ "name": tag.name, "color": tag.color ,"amount":1 })
						}
						else {
							listItem.amount++
						}
			})
		})
		list.map((item)=>{
			labels.push(item.name)
			numberOfTag.push(item.amount)
			colors.push(item.color)
		})
	}
	const chart = {
		options: {
			legend: {
				display: false,
				position: "right",
			},
			elements: {
				arc: {
					borderWidth: 3,
				},
			},
		},
		data: {
			maintainAspectRatio: false,
			responsive: false,
			labels: labels,
			datasets: [
				{
					data: numberOfTag,
					backgroundColor: colors,
					hoverBackgroundColor: colors,
				},
			],
		},
	};
	
  // const { data, options } = configs(chart.labels || [], chart.datasets || {}, chart.cutout);
  const data = {...chart.data}
  const options = {...chart.options}
  const renderChart = (
    <SuiBox p={2}>
      {title || description ? (
        <SuiBox px={description ? 1 : 0} pt={description ? 1 : 0}>
          {title && (
            <SuiBox mb={1}>
              <SuiTypography variant="h6">{title}</SuiTypography>
            </SuiBox>
          )}
          <SuiBox mb={2}>
            <SuiTypography component="div" variant="button" fontWeight="regular" color="text">
              {description}
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      ) : null}
      {useMemo(
        () =>  (
          <SuiBox height={height} >
            <Doughnut data={data} options={options} />
          </SuiBox>
        ),
        [chart, height]
      )}
    </SuiBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of DefaultDoughnutChart
DefaultDoughnutChart.defaultProps = {
  title: "",
  description: "",
  // height: "19.125rem",
};

// Typechecking props for the DefaultDoughnutChart
DefaultDoughnutChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default DefaultDoughnutChart;
