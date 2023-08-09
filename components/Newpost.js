import React from 'react'
import useStyles from '../utils/styles';
import { CgBolt } from 'react-icons/cg';

function Newpost() {
	const classes = useStyles();
	return (
		<div>
			<div className={classes.newpost}>NEW<CgBolt style={{fontSize:16}} /></div>
		</div>
	)
}
 
export default Newpost
