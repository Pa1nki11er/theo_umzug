import React, { useState } from "react";
import { DownloadOutlined, PrinterOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Radio } from "antd";

const CustomButton = ({title, size, onClick}) => {
  return (
    <Button type="primary" icon={<FilePdfOutlined />} onClick={onClick} size={size}>
      {title}
    </Button>
  );
};

export default CustomButton;