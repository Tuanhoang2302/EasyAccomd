import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  
//   ValueLabelComponent.propTypes = {
//     children: PropTypes.element.isRequired,
//     open: PropTypes.bool.isRequired,
//     value: PropTypes.number.isRequired,
//   };
  
const AirbnbSlider = withStyles({
    root: {
      color: '#3a8589',
      height: 3,
      padding: '13px 0',
    },
    thumb: {
      height: 27,
      width: 27,
      backgroundColor: '#fff',
      border: '1px solid currentColor',
      marginTop: -12,
      marginLeft: -13,
      boxShadow: '#ebebeb 0 2px 2px',
      '&:focus, &:hover, &$active': {
        boxShadow: '#ccc 0 2px 3px 1px',
      },
      '& .bar': {
        // display: inline-block !important;
        height: 9,
        width: 1,
        backgroundColor: 'currentColor',
        marginLeft: 1,
        marginRight: 1,
      },
    },
  
    active: {},
    track: {
      height: 3,
    },
    rail: {
      color: '#d8d8d8',
      opacity: 1,
      height: 3,
    },
  })(Slider);
  
  function AirbnbThumbComponent(props) {
    return (
      <span {...props}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </span>
    );
  }

export default function CustomizedSlider(props) {
    const handleChange = (e, value) => {
        props.setStatePrice(value)
    }
    var value;
    if(props.statePrice){
      value = props.statePrice
    }else{
      value = [0,20]
    }
    return (
        <AirbnbSlider
        ValueLabelComponent={ValueLabelComponent}
        ThumbComponent={AirbnbThumbComponent}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        defaultValue={[0,20]}
        value={value}
        onChange={(e, value) => handleChange(e, value)}
        max={20}
      />
    );
}