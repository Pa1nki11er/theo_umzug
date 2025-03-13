import React, { useState } from "react";
import { DownloadOutlined, PrinterOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Radio } from "antd";

const CustomButton = ({title, size, onClick, color, isLoading}) => {
  return (
    <Button icon={<FilePdfOutlined />} onClick={onClick} size={size} color={color}  variant="solid" loading={isLoading}>
      {title}
    </Button>
  );
};

export default CustomButton;