import React from 'react';
import PropTypes from 'prop-types';
import {Button} from "semantic-ui-react";

const ProgressButton = ({value, handleButtonClick}) => {
    return (

        <Button
            value={value}
            onClick={(e,{value}) => handleButtonClick(value)}
        >
            {value}
        </Button>
    )
}
ProgressButton.propTypes = {
    value: PropTypes.number.isRequired,
    handleButtonClick: PropTypes.func.isRequired
}

export default ProgressButton;
