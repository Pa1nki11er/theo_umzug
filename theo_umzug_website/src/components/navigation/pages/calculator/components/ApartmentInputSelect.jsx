import React from "react";
import { Flex, Input, Typography, Select } from "antd";
import "./../Calculator.css";

const ApartamentInputSelect = ({title, options}) => {
    return(
        <div className="apartment-input">
            <Typography.Title level={5}>{title}</Typography.Title>
            <Select
                defaultValue="1"
                style={{
                    width: 120,
                }}
                options={options}
            />
        </div>
    );
}

export default ApartamentInputSelect;