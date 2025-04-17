import React from "react";
import { Flex, Input, Typography, DatePicker } from "antd";
import "./../Calculator.css";

const { Paragraph } = Typography;

const DateInputField = ({title, options, placeholder, onChange, status, disabledTime}) => {
    return(
        <div className="apartment-input">
            <Paragraph strong>{title}</Paragraph>
            <DatePicker
                placeholder={placeholder}
                showTime
                disabledTime={disabledTime}
            />
        </div>
    );
}

export default ApartamentInputSelect;