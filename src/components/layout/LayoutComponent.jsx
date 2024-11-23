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

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ position: "fixed", width: "100%", zIndex: 1000 }}>
        <ResponsiveAppBar />
      </div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          width={256}
          collapsedWidth={80}
          collapsible
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
          style={{
            backgroundColor: "#001529",
            position: "fixed",
            top: 64,
            left: 0,
            bottom: 0,
            zIndex: 100,
            transition: "all 0.3s ease",
          }}
        >
          <MenuComponent toggleMenu={toggleCollapsed} />
        </Sider>

        <Layout
          style={{
            marginLeft: collapsed ? 80 : 256,
            overflowY: "auto",
            paddingTop: 64,
            transition: "all 0.3s ease",
          }}
        >
          <Content
            style={{
              padding: 0,
              margin: 0,
              minHeight: 280,
              backgroundColor: "#f0f2f5",
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
