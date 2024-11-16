import React from "react";
import { Layout } from "antd";
import MenuComponent from "../menuComponent/MenuComponent"; 

const { Content, Sider } = Layout;

const LayoutComponent = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={256} style={{ backgroundColor: "#001529", flexShrink: 0 }}>
        <MenuComponent />
      </Sider>
      <Layout style={{ padding: "0 24px 24px", flex: 1 }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            backgroundColor: "#f0f2f5", 
          }}
        >
          {children} 
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
