import { gql,useMutation } from "@apollo/client";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
const DELETE_EXPENSE = gql`
  mutation Delete_expense($id: ID!) {
    delete_expense(_id: $id) {
      status
      msg
    }
  }
`;
const DeleteExpense = ({id,refetch}) => {

	const [submit] = useMutation(DELETE_EXPENSE)

	const onSubmitToDeleteExpense = async () =>{
		try {
			const {data:{delete_expense:{status}}} = await submit({
				variables:{
					id:id
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

	return(
		<IconButton aria-label="delete" onClick={()=>onSubmitToDeleteExpense()}>
		<DeleteIcon />
	</IconButton>
	)
};

export default DeleteExpense;
