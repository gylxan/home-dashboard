import React from 'react';
import { Slider as MuiSlider, SliderProps } from '@material-ui/core';


export type Props = SliderProps;

const Slider: React.FC<Props> = (props) => <MuiSlider {...props} />;

export default Slider;
