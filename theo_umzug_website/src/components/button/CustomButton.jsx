import React from "react";
import { DownloadOutlined, PrinterOutlined, FilePdfOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button } from "antd";

const iconMap = {
  download: <DownloadOutlined />,
  print: <PrinterOutlined />,
  pdf: <FilePdfOutlined />,
  text: <FileTextOutlined />,
};

const CustomButton = ({ title, size, onClick, color, isLoading, iconType }) => {
  return (
    <Button
      icon={iconMap[iconType] || null}
      onClick={onClick}
      size={size}
      color={color}
      variant="solid"
      loading={isLoading}
    >
      {title}
    </Button>
  );
};

export default CustomButton;