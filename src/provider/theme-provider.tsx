import { ConfigProvider } from "antd";
import React, { ReactNode } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000",
        },
        components: {
          Button: {},
          Input: {},
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
