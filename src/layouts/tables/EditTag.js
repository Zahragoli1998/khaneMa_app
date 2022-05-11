import React from "react";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Box from "@mui/material/Box";
import SuiInput from "components/SuiInput";
import CheckIcon from "@mui/icons-material/Check";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { ToggleButton } from "@mui/material";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useSoftUIController } from "../../context/index";
import { MY_TAGS } from "layouts/authentication/sign-in";
import { HuePicker } from "react-color";

const EDIT_TAG = gql`
  mutation Mutation($id: ID!, $data: tagInfo!) {
    edit_tag(_id: $id, data: $data) {
      status
      msg
    }
  }
`;

const EditTag = ({
  colors,
  setTagColor,
  tagColor,
  tagName,
  setTagName,
  selected,
  setSelected,
  tagId,
	setIsOpen,
	refetch
}) => {
  const [editTag] = useMutation(EDIT_TAG);

  const onSubmitToEditTag = async () => {
    console.log(tagId, tagColor, tagName);
    console.log(typeof tagId);
    try {
      const {
        data: {
          edit_tag: { status },
        },
      } = await editTag({
        variables: {
          id: tagId,
          data: {
            color: tagColor,
            name: tagName,
          },
        },
      });
      console.log(status);
      if (status === 200) {
				setIsOpen(true)
        refetch()
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <HuePicker width="15vw" color={tagColor} onChangeComplete={(e) => setTagColor(e.hex.split('#')[1])}/>

      <Box sx={{ display: "flex", justifyContent: "space-between", width: "15vw" }}>
        {colors.map((color) => {
          return (
            <RadioButtonCheckedIcon
              onClick={() => setTagColor(color)}
              fontSize="medium"
              sx={{ color: `#${color}`, cursor: "pointer" }}
            />
          );
        })}
      </Box>
      <Box sx={{ width: "22vw" }}>
        <SuiInput
          onChange={(e) => setTagName(e.target.value)}
          value={tagName}
          placeholder="نام تگ"
        />
      </Box>
      <ToggleButton
        value="check"
        selected={selected}
        onClick={() => {
          setSelected(!selected);
          onSubmitToEditTag();
        }}
      >
        <CheckIcon />
      </ToggleButton>
    </Box>
  );
};

export default EditTag;
