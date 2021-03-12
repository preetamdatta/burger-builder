import React from 'react'
import classes from './DrawerToggle.module.css'

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>&#x2261;</div>
)

export default drawerToggle;