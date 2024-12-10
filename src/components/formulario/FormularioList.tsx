import React, { FC } from "react";
import { TextField, Button, Card, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Forms: FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username") as string,
      email: data.get("Email") as string,
      institution: data.get("Instituição") as string,
    });
    //autenticacao aq
  };

  const handleIrloginProfessor = () => {
    navigate("/login");
  };

  const handleIrloginEstudante = () => {
    navigate("/loginEstudante");
  };

  return (
    <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  }}
>
  <Card sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
    <Box sx={{ mb: 3 }}>
      <Card
        sx={{
          padding: 2,
          marginBottom: 2,
          boxShadow: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#011C40",
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          sx={{
            mb: 1,
            backgroundColor: "#0455BF",
            color: "#fff", 
          }}
        >
          Login com Google
        </Button>
        <Button
          onClick={handleIrloginProfessor}
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: "#0455BF",
            color: "#fff",
            marginBottom: 1
          }}
        >
          Login como Professor
        </Button>
        <Button
          onClick={handleIrloginEstudante}
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: "#0455BF",
            color: "#fff", 
          }}
        >
          Login como aluno
        </Button>
      </Card>
    </Box>
    <hr /> <br />
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#011C40", 
        borderRadius: 2,
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          mb: 2,
          fontWeight: "bold",
          fontSize: "1.2rem",
          textAlign: "center",
        }}
      >
        Cadastro na Lista
      </Typography>
      <TextField
        fullWidth
        label="Nome"
        variant="outlined"
        sx={{
          mb: 2,
          backgroundColor: "#f5f5f5", 
        }}
      />
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        sx={{
          mb: 2,
          backgroundColor: "#f5f5f5",
        }}
      />
      <TextField
        fullWidth
        label="Instituição"
        variant="outlined"
        sx={{
          mb: 2,
          backgroundColor: "#f5f5f5",
        }}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#0455BF",
          color: "#fff",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#0349A6",
          },
        }}
      >
        Confirmar
      </Button>
    </Box>
  </Card>
</Box>

  );
};

export default Forms;
