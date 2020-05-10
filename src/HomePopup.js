import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import InfoIcon from '@material-ui/icons/Info';
import Popup from './Popup'
import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const readme = require('README.txt')

export default function HomePopup(props) {

    const content = (
    <DialogContentText>
        {readme}
    </DialogContentText>);

    return (
        <Popup
            title="About this 3D viewer"
            innerContent={content}
            icon={<InfoIcon />}
            closeText="Try it"
            transition = {Transition}
            {...props}
        />
    )
}
