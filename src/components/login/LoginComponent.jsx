import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BasicCard() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/professor/login",
        { email, senha }
      );

      if (response.status === 200) {
        const { id, nome } = response.data;
        localStorage.setItem("nomeProf", nome);
        localStorage.setItem("ProfessorId", id);

        toast.success("Logado com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/home");
        }, 3000); 
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erro ao fazer login. Tente novamente.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      console.error("Erro ao fazer login:", error.response?.data || error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #011C40, #0349A6)",
        padding: "16px",
        boxSizing: "border-box",
        gap: 4,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <ToastContainer />
      <Box
        component="img"
        src="ProfessorLogin.jpg"
        alt="Imagem ao lado do card"
        sx={{
          width: { xs: 0, sm: "30%" },
          height: 350,
          borderRadius: 2,
          boxShadow: 3,
          display: { xs: "none", sm: "block" },
        }}
      />
      <Card
        sx={{
          minWidth: 100,
          maxWidth: 250,
          width: "100%",
          height: { xs: 250, sm: 400 },
          boxShadow: 3,
          padding: 3,
          borderRadius: 2,
          backgroundColor: "transparent",
          border: "2px solid white",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ textAlign: "center", mb: 3.5, color: "white" }}
          >
            <h3>Login Professor</h3>
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              position: "relative",
              left: -15,
            }}
          >
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "12px 16px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                width: "100%",
              }}
            />
            <input
              placeholder="Senha"
              type="password"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={{
                padding: "12px 16px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                width: "100%",
              }}
            />
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", mt: 2 }}>
          <Button variant="contained" color="primary" size="large" onClick={handleLogin}>
            Entrar
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
