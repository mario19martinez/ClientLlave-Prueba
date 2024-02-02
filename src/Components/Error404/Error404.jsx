function Error404() {
  return (
    <main className="grid min-h-full place-items-center bg-gradient-to-r from-blue-400 to-indigo-950 px-6 py-24 sm:py-32 lg:px-8 text-white">
      <div className="text-center">
        <p className="text-4xl font-semibold">Oops! 404</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight">
        Página no encontrada
        </h1>
        <p className="mt-6 text-lg leading-7">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-full bg-white text-blue-800 px-6 py-3 text-lg font-semibold shadow-lg hover:bg-blue-900 hover:text-white transition duration-300"
          >
            Regresar al inicio
          </a>
          <a href="#" className="text-lg font-semibold border px-6 py-3 rounded-full">
            {" "}
            Soporte tecnico <span>&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}

export default Error404;
