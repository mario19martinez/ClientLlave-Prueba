// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ViewHome from "./views/ViewHome/viewHome";
import ViewRegistro from "./views/ViewRigistro/ViewRegistro";
import ViewAbaut from "./views/ViewAbaut/ViewAbaut";
import ViewBlogs from "./views/ViewBlogs/ViewBlogs";
import ViewBlog from "./views/ViewBlogs/ViewBlog";
import ViewBlogCreate from "./views/ViewAdmin/ViewBlogCreate";
import ViewBlogDetailsAdmin from "./views/ViewAdmin/ViewBlogDetailsAdmin";
import ViewAdminBlogs from "./views/ViewAdmin/ViewAdminBlogs";
import ViewMenuStudent from "./views/ViewMenuStudent/ViewMenuStudent";
import ViewProfile from "./views/ViewMenuStudent/ViewProfile";
import ViewCursosInscritos from "./views/ViewMenuStudent/ViewCursosInscritos";
import UserDetail from "./Components/Admin/UserDetail/UserDetail";
import ViewDashBoardAdmin from "./views/ViewAdmin/ViewDashBoardAdmin";
import Cursos from "./Components/Admin/Cursos/Cursos";
import Error404 from "./Components/Error404/Error404";
import ViewErrorPaginaConstruccion from "./views/ViewErrores/ViewErrorPaginaConstruccion";
import AgregarCurso from "./Components/Admin/Cursos/AgregarCurso";
import ViewAjustes from "./views/ViewMenuStudent/ViewAjustes";
import ViewPreguntasRespuestas from "./views/ViewMenuStudent/ViewPreguntasRespuestas";
import ViewMisTalleres from "./views/ViewMenuStudent/ViewMisTalleres";
import ViewAdminCursos from "./views/ViewAdmin/ViewAdminCursos";
import ViewAdminClasesTalleresPDF from "./views/ViewAdmin/ViewAdminClasesTalleresPDF";
import ViewUsersAndCursos from "./views/ViewAdmin/ViewUsersAndCursos";
import ViewCursosAndUsers from "./views/ViewAdmin/ViewCursosAndUsers";
import ViewClasesAdmin from "./views/ViewAdmin/ViewClasesAdmin";
import ViewAjustesAdmin from "./views/ViewAdmin/ViewAjustesAdmin";
import ViewRoles from "./views/ViewAdmin/ViewRoles";
import Clases from "./Components/Cursos/Cursos";
import ViewClases from "./views/ViewClases/ViewClases";
import ViewAdminTestimonio from "./views/ViewAdmin/ViewAdminTestimonio";
//import Entrenamiento from "./Components/Entrenamiento/Entrenamiento";
import AgregarClases from "./Components/Admin/Clases/AgregarClases";
import ViewEntrenamiento from "./views/ViewEntrenamiento/ViewEntrenamiento";
import ViewUsersDeleted from "./views/ViewAdmin/ViewUsersDeleted";
import CursoEdit from "./Components/Admin/Cursos/CursoEdit";
import ViewCursosEliminados from "./views/ViewAdmin/ViewCursosEliminados";
//import ClaseDetail from "./Components/Admin/Clases/ClaseDetail";
import ViewClasesTalleresPDF from "./views/ViewClases/ViewClasesTalleresPDF";
import HomeComunidadView from "./views/ViewComunidad/home/HomeComunidadView";
import UserList from "./Components/Comunidad/UserCardSocial/UserList";
import userData from "./Components/Comunidad/UserCardSocial/userData";
import Message from "./Components/Comunidad/Message/Message";
import AgregarAmigo from "./Components/Comunidad/AgregarAmigo/AgregarAmigo";
import ViewCrearTalleres from "./views/ViewAdmin/ViewCrearTalleres";
import ViewChat from "./views/ViewComunidad/chat/ViewChat";
import ViewAdminAbaut from "./views/ViewAdmin/ViewAdminAbaut";
import ViewAdminAbautCreate from "./views/ViewAdmin/ViewAdminAbautCreate";
import ViewAdminAbautActualizar from "./views/ViewAdmin/ViewAdminAbautActualizar";
import ViewClasesUser from "./views/ViewCursoUser/ViewCursoUser";
import ViewMyPost from "./views/ViewMenuStudent/ViewMyPost";
import Viewinformacion from "./views/Viewinformacionn/Viewinformacion";
import ViewNoticias from "./views/ViewAdmin/ViewNoticias";
import Viewdetailsentrenamiento from "./views/Viewdetailsentrenamiento/Viewdetailsentrenamiento";
import Viewadminvideo from "./views/ViewAdmin/Viewadminvideo";
import ViewLogin from "./views/ViewLogin/ViewLogin";
import ViewFormObsequio from "./views/ViewRigistro/ViewFormObsequio";
import ViewPoliticas from "./views/ViewPoliticas/ViewPoliticas";
import ViewAnalyticsUsers from "./views/ViewAdmin/ViewAnalyticsUsers";
import ViewTratamientoDeDatos from "./views/ViewTratamientoDeDatos/ViewTratamientoDeDatos";
import ViewTestimonios from "./views/ViewTestimonios/ViewTestimonios";
import ViewCaracter from "./views/ViewCompProfeticos/ViewCararcter";
import ViewFormProfetico from "./views/ViewCompProfeticos/ViewFormProfetico";
import ViewHistria from "./views/ViewCompProfeticos/ViewHistoria";
import ViewDoctrina from "./views/ViewCompProfeticos/ViewDoctrina";
import ViewLlamamiento from "./views/ViewCompProfeticos/ViewLlamamiento";
import ViewEgresados from "./views/ViewEgresados/ViewEgresados";
import ViewCreateEgresados from "./views/ViewEgresados/ViewCreateEgresados";
import ViewAdminPage from "./views/ViewAdmin/ViewAdminPage";
import ViewNivelAdmin from "./views/ViewAdmin/ViewNivelAdmin/ViewNivelAdmin";
import ViewNivelDetailAdmin from "./views/ViewAdmin/ViewNivelAdmin/ViewNivelDetailAdmin";
import ModuloDetailAdmin from "./Components/Admin/ModuloAdmin/ModuloDetailAdmin";
import NivelesDetail from "./Components/Niveles/NivelesDetail";
import ModuloDetail from "./Components/ModulosNivel/ModuloDetail";
import NivelClasesDetail from "./Components/NivelClases/NivelClasesDetail";

import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3001";
//axios.defaults.baseURL = "https://ancient-falls-91374-828594f7d42c.herokuapp.com/";
axios.defaults.baseURL = "https://morning-falls-53309-9dc95113eb57.herokuapp.com/";

const isLoggedIn = localStorage.getItem("isLoggedIn");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewHome />} />
        <Route
          path="/estudiante/Escritorio"
          element={isLoggedIn ? <ViewMenuStudent /> : <Navigate to="/" />}
        />
        <Route
          path="/estudiante/profile"
          element={isLoggedIn ? <ViewProfile /> : <Navigate to="/" />}
        />
        <Route
          path="/estudiante/cursosInscritos"
          element={isLoggedIn ? <ViewCursosInscritos /> : <Navigate to="/" />}
        />
        <Route
          path="/estudiante/Ajustes"
          element={isLoggedIn ? <ViewAjustes /> : <Navigate to="/" />}
        />
        <Route
          path="/estudiante/Preguntas&Respuestas"
          element={
            isLoggedIn ? <ViewPreguntasRespuestas /> : <Navigate to="/" />
          }
        />
        <Route
          path="/estudiante/MisTalleres"
          element={isLoggedIn ? <ViewMisTalleres /> : <Navigate to="/" />}
        />
        <Route
          path="/admin"
          element={isLoggedIn ? <ViewDashBoardAdmin /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/cursos"
          element={isLoggedIn ? <ViewAdminCursos /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/roles"
          element={isLoggedIn ? <ViewRoles /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/curso/:id"
          element={isLoggedIn ? <ViewClasesAdmin /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/cursos/edit/:id"
          element={isLoggedIn ? <CursoEdit /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/cursos/:id/clases/:claseId/pdf"
          element={
            isLoggedIn ? <ViewAdminClasesTalleresPDF /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/cursos/crearTaller"
          element={isLoggedIn ? <ViewCrearTalleres /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/usersDeleted"
          element={isLoggedIn ? <ViewUsersDeleted /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/cursosDeleted"
          element={isLoggedIn ? <ViewCursosEliminados /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/testimonios"
          element={isLoggedIn ? <ViewAdminTestimonio /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/cursos/users-cursos"
          element={isLoggedIn ? <ViewUsersAndCursos /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/cursos/cursos-users"
          element={isLoggedIn ? <ViewCursosAndUsers /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/blogs"
          element={isLoggedIn ? <ViewAdminBlogs /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/blogDetails/:blogId"
          element={isLoggedIn ? <ViewBlogDetailsAdmin /> : <Navigate to="/" />}
        />
        <Route
          path="/Admin/CrearNosostros"
          element={<ViewAdminAbautCreate />}
        />
        <Route
          path="/Admin/EditarNosotros/:id"
          element={<ViewAdminAbautActualizar />}
        />
        <Route path="/Admin/Nosotros" element={<ViewAdminAbaut />} />
        <Route
          path="/admin/ajustes"
          element={isLoggedIn ? <ViewAjustesAdmin /> : <Navigate to="/" />}
        />
        <Route
          path="/cursos/:id/clases/:claseId/pdf"
          element={isLoggedIn ? <ViewClasesTalleresPDF /> : <Navigate to="/" />}
        />
        <Route
          path="/userDetail/:identificacion"
          element={isLoggedIn ? <UserDetail /> : <Navigate to="/" />}
        />
        <Route path="/RegistroUser" element={<ViewRegistro />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/Nosotros" element={<ViewAbaut />} />
        <Route path="/blogs" element={<ViewBlogs />} />
        <Route path="/blog/:blogId" element={<ViewBlog />} />
        <Route path="/blog/CrearBlog" element={<ViewBlogCreate />} />
        <Route path="/error" element={<Error404 />} />
        <Route path="/Error404" element={<ViewErrorPaginaConstruccion />} />
        <Route path="/agregar" element={<AgregarCurso />} />
        <Route path="/clases" element={<Clases />} />
        <Route path="/viewclases" element={<ViewClases />} />
        <Route path="/entrenamiento" element={<ViewEntrenamiento />} />
        <Route path="/curso/:id" element={<ViewClases />} />
        <Route path="/agregarclases" element={<AgregarClases />} />
        <Route
          path="/Comunidad"
          element={isLoggedIn ? <HomeComunidadView /> : <Navigate to="/" />}
        />
        <Route
          path="/Comunidad/users"
          element={<UserList users={userData} />}
        />
        <Route path="/message" element={<Message />} />
        <Route path="/agregarAmigo" element={<AgregarAmigo />} />
        <Route path="/chat-users" element={<ViewChat />} />
        <Route path="/user/curso/:id" element={<ViewClasesUser />} />
        <Route path="/my-posts" element={<ViewMyPost />} />
        <Route path="/admin/informacion" element={<Viewinformacion />} />
        <Route path="/admin/noticias" element={<ViewNoticias />} />
        <Route path="/informacion/:id" element={<Viewdetailsentrenamiento />} />
        <Route path="/admin/videos" element={<Viewadminvideo />} />
        <Route path="/login" element={<ViewLogin />} />
        <Route path="/FormObsequio" element={<ViewFormObsequio />} />
        <Route path="/PoliticasPrivacidad" element={<ViewPoliticas />} />
        <Route path="/admin/AnalyticsUser" element={<ViewAnalyticsUsers />} />
        <Route
          path="/TratamientoDeDatos"
          element={<ViewTratamientoDeDatos />}
        />
        <Route path="/Testimonios" element={<ViewTestimonios />} />
        <Route path="/Caracter" element={<ViewCaracter />} />
        <Route path="/Historia" element={<ViewHistria />} />
        <Route path="/Doctrina" element={<ViewDoctrina />} />
        <Route path="/Llamamiento" element={<ViewLlamamiento />} />
        <Route path="/CrearProfetico" element={<ViewFormProfetico />} />
        <Route path="/Egresados" element={<ViewEgresados />} />
        <Route path="/admin/crearEgresado" element={<ViewCreateEgresados />} />
        <Route path="/AdminPage" element={<ViewAdminPage />} />
        <Route path="/niveladmin" element={<ViewNivelAdmin />} />
        <Route path="/nivel/:id" element={<ViewNivelDetailAdmin />} />
        <Route
          path="/nivel/:nivelId/modulo/:moduloId"
          element={<ModuloDetailAdmin />}
        />
        <Route path="/niveldetail/:id" element={<NivelesDetail />} />
        <Route
          path="/home/nivel/:nivelId/modulo/:moduloId"
          element={<ModuloDetail />}
        />
        <Route
          path="/modulo/:moduloId/clase/:claseId"
          element={<NivelClasesDetail />}
        />
      </Routes>
    </Router>
  );
}

export default App;
