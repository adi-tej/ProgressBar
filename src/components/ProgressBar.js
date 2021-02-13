import React from 'react';
import './ProgressBar.css';
import PropTypes from 'prop-types';

const ProgressBar = ({value}) => {
    return(
        <div
            className={'progressBar ui large progress '+(value>100?'error':null)}
            data-percent={value}
        >
            <div className='bar' style={{width:value+'%'}}>
            </div>

            <div className='progressText'>{value+"%"}</div>
        </div>
    )
}
ProgressBar.propTypes = {
    value: PropTypes.number.isRequired
}

export default ProgressBar;
