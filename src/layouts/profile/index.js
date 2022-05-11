import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/profile/components/Header";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import UplodImage from "./components/UplodImage";
const ME = gql`
  query Query {
    me {
      _id
      name
      username
    }
  }
`;
function Overview() {
	const{loading,error,data,refetch}= useQuery(ME)
  return (
    <DashboardLayout>
      <Header userInfo={data} refetch={refetch} />
    </DashboardLayout>
  );
}

export default Overview;
