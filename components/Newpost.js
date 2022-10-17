import React from 'react'
import useStyles from '../utils/styles';

function Newpost() {
	const classes = useStyles();
	return (
		<div>
			<div className={classes.newpost}>NEW</div>
		</div>
	)
}

export default Newpost
