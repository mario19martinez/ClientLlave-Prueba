// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button, Typography } from "@mui/material";
import { Home, LiveHelp, ErrorOutline } from "@mui/icons-material";

export default function ComponenteEnConstruccion() {
  return (
    <>
      {/* Elemento para pantallas medianas y grandes */}
      <main className=" min-h-screen place-items-center bg-gradient-to-r from-blue-400 to-indigo-700 px-4 sm:px-8 py-12 sm:py-24 text-white hidden sm:block">
        <div className="max-w-lg mx-auto text-center">
          <ErrorOutline style={{ fontSize: 48 }} className="text-red-500 mb-4" />
          <Typography variant="h4" component="p" className="font-semibold text-sm sm:text-lg">
            Oops! 404
          </Typography>
          <Typography variant="h1" component="h1" className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight">
            Página en construcción
          </Typography>
          <Typography variant="body1" className="mt-6 text-sm sm:text-base leading-7">
            Lo sentimos, la página que estás buscando aún no está disponible. Estamos trabajando en ella y estará disponible pronto.
          </Typography>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
            <Button
              href="/"
              variant="contained"
              color="primary"
              size="large"
              className="shadow-md hover:bg-blue-800 hover:text-white"
              startIcon={<Home />}
            >
              Regresar al inicio
            </Button>
            <Button
              href="#"
              variant="contained"
              color="primary"
              size="large"
              className="hover:bg-blue-800 hover:text-white"
              endIcon={<LiveHelp />}
            >
              Soporte técnico
            </Button>
          </div>
        </div>
      </main>

      {/* Elemento para pantallas pequeñas (móviles) */}
      <div className="bg-gradient-to-r from-blue-400 to-indigo-700 py-8 px-4 text-white block sm:hidden">
        <div className="text-center">
          <ErrorOutline style={{ fontSize: 48 }} className="text-red-500 mb-4" />
          <Typography variant="h4" component="p" className="font-semibold text-lg">
            Oops! 404
          </Typography>
          <Typography variant="h1" component="h1" className="mt-4 text-2xl font-bold tracking-tight">
            Página en construcción
          </Typography>
          <Typography variant="body1" className="mt-6 text-base leading-7">
            Lo sentimos, la página que estás buscando aún no está disponible. Estamos trabajando en ella y estará disponible pronto.
          </Typography>
          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <Button
              href="/"
              variant="contained"
              color="primary"
              size="large"
              className="shadow-md hover:bg-blue-800 hover:text-white"
              startIcon={<Home />}
            >
              Regresar al inicio
            </Button>
            <Button
              href="#"
              variant="contained"
              color="primary"
              size="large"
              className="hover:bg-blue-800 hover:text-white"
              endIcon={<LiveHelp />}
            >
              Soporte técnico
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
