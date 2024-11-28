import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BasicCard() {
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
      <Box
        component="img"
        src="AlunoLogin.jpg"
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
          height: { xs: 250, sm: 300 },
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
            <h3>Login</h3>
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
          <Button variant="contained" color="primary" size="large">
            Entrar
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
