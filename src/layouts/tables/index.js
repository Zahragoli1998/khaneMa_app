import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Box from "@mui/material/Box";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Alert, List, TextField, ToggleButton } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import EditTag from "./EditTag";
import AddTag from "./AddTag";
import Tags from "./MyTags";
import {
  useSoftUIController,
  setMiniSidenav,
  setOpenConfigurator,
  setTags,
  setRefetch,
} from "context";
export const MY_TAGS = gql`
  query Query {
    getMyTags {
      _id
      name
      color
    }
  }
`;
const Tables = () => {
  const [myTags, setMyTags] = useState([]);
  const [selected, setSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tagId, setTagId] = useState("");
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [controller, dispatch] = useSoftUIController();
  const { loading, error, data, refetch } = useQuery(MY_TAGS);
  const { tags } = controller;

  useEffect(() => {
    if (data) {
      setMyTags([...data.getMyTags.map((item) => ({ ...item, isSelected: false }))]);
      setTags(dispatch, data.getMyTags);
    }
  }, [data]);

  const colors = ["ff0000", "ffa600", "ffc0cb", "ffff00", "0000ff", "008000"];
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3} sx={{ display: "flex", alignItems: "center" }}>
          <SuiBox mb={3}>
            <Card sx={{ width: "70vw", minHeight: "40vw" }}>
              <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SuiTypography variant="h6">تگ ها</SuiTypography>
                <AddIcon sx={{ cursor: "pointer" }} onClick={() => setShowModal(!showModal)} />
              </SuiBox>
              {showModal ? (
                <AddTag
                  colors={colors}
                  setSelected={setSelected}
                  setTagColor={setTagColor}
                  setTagName={setTagName}
                  selected={selected}
                  tagColor={tagColor}
                  tagName={tagName}
									refetch={refetch}
                />
              ) : null}
              <List sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {myTags.map((item, i) => {
                  return (
                    <Box key={item._id}>
                      <ListItemButton>
                        <ListItemIcon
                          sx={{
                            width: "5vw",
                            height: "5vw",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              variant: "gradient",
                              backgroundColor: `#${item.color}`,
                              color: "dark",
                              width: "2rem",
                              height: "2rem",
                              borderRadius: "0.5rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              boxShadow: "3",
                            }}
                          ></Box>
                        </ListItemIcon>
                        <ListItemText secondary={`${item.name}`} />
                        <ListItemIcon>
                          <EditIcon
                            onClick={() => {
                              const newarr = [...myTags];
                              newarr.map((item) => (item.isSelected = false));
                              newarr[i].isSelected = !newarr[i].isSelected;
                              setMyTags([...newarr]);
                              setTagColor(item.color);
                              setTagName(item.name);
                              setTagId(item._id);
                            }}
                          />
                        </ListItemIcon>
                      </ListItemButton>
                      {item.isSelected ? (
                        <EditTag
                          colors={colors}
                          setSelected={setSelected}
                          setTagColor={setTagColor}
                          setTagName={setTagName}
                          selected={selected}
                          tagColor={tagColor}
                          tagName={tagName}
                          tagId={tagId}
                          setIsOpen={setIsOpen}
                          refetch={refetch}
                        />
                      ) : null}
                    </Box>
                  );
                })}
              </List>
            </Card>
          </SuiBox>
        </SuiBox>
      </DashboardLayout>
    </>
  );
};

export default Tables;
