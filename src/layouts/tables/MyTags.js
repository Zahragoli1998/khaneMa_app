



	const Tags = async (dispatch,submit,setRefetch,setTags,setMyTags) => {
		
		const { loading, error, data,refetch } = await submit;
       console.log('omadi?');
			 console.log(loading);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error} </p>;
			console.log(data);
			setTags(dispatch,data.getMyTags)
			setMyTags([...data.getMyTags.map((item) => ({ ...item, isSelected: false }))])
			setRefetch(dispatch,refetch)
  };

export default Tags