import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const settings = ["Perfil", "Conta", "Dashboard", "Sair"];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [nome, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const nome = localStorage.getItem("nomeProf") || localStorage.getItem("nomeEst");
    if (nome) {
      setUserName(nome);
    }
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          "http://localhost:8080/estudantes/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      localStorage.removeItem("token");
      localStorage.removeItem("nomeEst") || localStorage.removeItem("nomeProf");
      localStorage.removeItem("EstudanteId") || localStorage.removeItem("ProfessorId");

      navigate("/home");
      window.location.reload();
      console.log("logout sucesso!");
    } catch (error) {
      console.error("Erro ao fazer logout: ", error);
    } finally {
      handleCloseUserMenu();
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {nome && ( 
              <Typography
                variant="h6"
                sx={{ color: "white", marginRight: "10px" }}
              >
                Olá, {nome}
              </Typography>
            )}
            <Tooltip title="Abrir configurações">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={nome} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) =>
                setting === "Sair" ? (
                  <MenuItem key={setting} onClick={handleLogout}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;