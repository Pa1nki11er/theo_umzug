import React from "react";
import { Flex, Input, Typography, Select } from "antd";
import "./../Calculator.css";

const { Paragraph } = Typography;

const ApartamentInputSelect = ({title, options, placeholder, onChange}) => {
    return(
        <div className="apartment-input">
            {/* <Typography.Title level={5}>{title}</Typography.Title> */}
            <Paragraph strong>{title}</Paragraph>
            <Select
                style={{
                    width: "10vw",
                }}
                options={options}
                placeholder={placeholder}
                onChange={onChange}
                size="large"
                title={title}
            />
        </div>
    );
}

export default ApartamentInputSelect;