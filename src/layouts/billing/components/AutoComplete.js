import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function LimitTags({tags,setTagIsSelected}) {
 
	const filterItems = (items) =>{
		 setTagIsSelected([...items.map(item=>{
			 return item._id
		 })])
	}
  return (
    <Autocomplete
      multiple
      limitTags={2}
			onChange={(e,val)=>{
				filterItems(val)
				// setTagIsSelected([...val])
			}}
      id="multiple-limit-tags"
      options={tags}
      getOptionLabel={(option) => {
				return option.name
			}}
      defaultValue={[]}
      renderInput={(params) => (
        <TextField {...params} label="تگ ها" />
      )}
      sx={{ width: '100%' }}
    />
  );
}