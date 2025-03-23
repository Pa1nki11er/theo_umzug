import React from "react";
import { Flex, Input, Typography, Select, InputNumber } from "antd";
import "./../Calculator.css";

const { Paragraph } = Typography;

const ApartamentNumberInput = ({title, placeholder, onChange, step, status}) => {
    return(
        <div className="apartment-input">
            <Paragraph strong>{title}</Paragraph>
            <InputNumber
                style={{
                    width: "10vw",
                }}
                size="large"
                min={0} max={100}
                placeholder={placeholder}
                onChange={onChange}
                step={step}
                status={status}
            />
        </div>
    );
}

export default ApartamentNumberInput;