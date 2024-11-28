import React, { useState } from "react";
import { Layout } from "antd";
import MenuComponent from "../menuComponent/MenuComponent";
import ResponsiveAppBar from "../header/Header";

const { Content, Sider } = Layout;

const LayoutComponent = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  const siderWidth = window.innerWidth <= 768 ? 149.5 : 256;

  return (
    <div style={{ height: "100vh", overflowY: "auto" }}> 
      <div style={{ position: "fixed", width: "100%", zIndex: 1000 }}>
        <ResponsiveAppBar />
      </div>

      <Layout style={{ height: "100%" }}>
        <Sider
          width={siderWidth}
          collapsedWidth={80}
          collapsible
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
          style={{
            backgroundColor: "#001529",
            position: "fixed",
            top: 55, 
            left: 0,
            bottom: 0,
            zIndex: 100,
            transition: "all 0.3s ease",
            overflowY: "auto", 
          }}
        >
          <MenuComponent toggleMenu={toggleCollapsed} />
        </Sider>

        <Layout
          style={{
            marginLeft: collapsed ? 80 : siderWidth, 
            paddingTop: 55, 
            height: "100%",
            overflowY: "auto", 
          }}
        >
          <Content
            style={{
              padding: 0,
              margin: 0,
              backgroundColor: "#f0f2f5",
              height: "calc(100vh - 64px)",  
              overflowY: "auto",  
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutComponent;
