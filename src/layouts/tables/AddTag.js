import React, { useState } from "react";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import SuiInput from "components/SuiInput";
import CheckIcon from "@mui/icons-material/Check";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Box from "@mui/material/Box";
import { ToggleButton } from "@mui/material";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useSoftUIController } from "../../context/index";
import { HuePicker, SketchPicker } from "react-color";


const ADD_TAG = gql`
  mutation Mutation($data: tagInfo!) {
    create_tag(data: $data) {
      status
      msg
    }
  }
`;

const AddTag = ({
  colors,
  setTagColor,
  tagColor,
  tagName,
  setTagName,
  selected,
  setSelected,
  refetch,
}) => {
  const [addTag] = useMutation(ADD_TAG);
	const [backgroundColor,setBackGroundColor] = useState('#fff')
	console.log(tagColor);

  const onSubmitToAddTag = async () => {
		console.log(tagColor);
    try {
      const {
        data: {
          create_tag: { status },
        },
      } = await addTag({
        variables: {
          data: {
            name: tagName,
            color: tagColor,
          },
        },
      });
      console.log(status);

      if (status === 200) {
			  setTagName("")
        refetch();
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
        {colors.map((color, i) => {
          return (
            <RadioButtonCheckedIcon
              key={i}
              onClick={() => setTagColor(color)}
              fontSize="medium"
              sx={{ color: `#${color}`, cursor: "pointer" }}
            />
          );
        })}
      </Box>
      {/* <Box sx={{ width: "22vw" }}>
        <SuiInput
          onChange={(e) => setTagColor(e.target.value)}
          value={tagColor}
          placeholder="رنگ دلخواه"
          label="nnnnnnn"
        />
      </Box> */}
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
          console.log("kkkkkkkkkkkkkkkkkkkkk");
          setSelected(!selected);
          onSubmitToAddTag();
        }}
      >
        <CheckIcon />
      </ToggleButton>
    </Box>
  );
};

export default AddTag;
