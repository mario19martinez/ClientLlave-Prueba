import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

//Imports de home pagina libres
import ViewHome from "./views/ViewHome/viewHome";
import ViewAbaut from "./views/ViewAbaut/ViewAbaut";
import ViewBlog from "./views/ViewBlogs/ViewBlog";
import ViewBlogs from "./views/ViewBlogs/ViewBlogs";
import Error404 from "./Components/Error404/Error404";
import ViewLogin from "./views/ViewLogin/ViewLogin";
import ViewRegistro from "./views/ViewRigistro/ViewRegistro";
import ViewPoliticas from "./views/ViewPoliticas/ViewPoliticas";
import ViewEgresados from "./views/ViewEgresados/ViewEgresados";
import ViewCaracter from "./views/ViewCompProfeticos/ViewCararcter";
import ViewHistria from "./views/ViewCompProfeticos/ViewHistoria";
import ViewDoctrina from "./views/ViewCompProfeticos/ViewDoctrina";
import ViewLlamamiento from "./views/ViewCompProfeticos/ViewLlamamiento";
import ViewTestimonios from "./views/ViewTestimonios/ViewTestimonios";
import ViewFormObsequio from "./views/ViewRigistro/ViewFormObsequio";
import ViewEntrenamiento from "./views/ViewEntrenamiento/ViewEntrenamiento";
import ViewTransmision from "./views/ViewTransmisiones/ViewTransmision";
import ViewTransmisiones from "./views/ViewTransmisiones/ViewTransmisiones";
import ViewTransmisionDetails from "./views/ViewTransmisiones/ViewTransmisionDetails";
import ViewHomeNoLogued from "./views/ViewComunidad/HomeNoLoged/ViewHomeNoLogued";
import ViewTratamientoDeDatos from "./views/ViewTratamientoDeDatos/ViewTratamientoDeDatos";
import ViewFormObsequioCampain from "./views/ViewCampainObsequio/ViewFormObsequioCampain";
import ViewErrorPaginaConstruccion from "./views/ViewErrores/ViewErrorPaginaConstruccion";
import ViewFormRegistroUsersIglesia from "./views/ViewRigistro/ViewFormRegistroUsersIglesia";

//Imports de estudiantes
import ViewMenuStudent from "./views/ViewMenuStudent/ViewMenuStudent";
import ViewProfile from "./views/ViewMenuStudent/ViewProfile";
import ViewCursosInscritos from "./views/ViewMenuStudent/ViewCursosInscritos";
import ViewAjustes from "./views/ViewMenuStudent/ViewAjustes";
import ViewPreguntasRespuestas from "./views/ViewMenuStudent/ViewPreguntasRespuestas";
import ViewNivelesInscitos from "./views/ViewMenuStudent/ViewNivelesInscritos";
import ViewLevelsDetails from "./views/ViewMenuStudent/ViewsLevels/ViewLevelsDetails";
import ViewModuloDetailsUser from "./views/ViewMenuStudent/ViewsLevels/ViewModuloDetailsUser";
import ViewCertificacion from "./views/ViewMenuStudent/ViewCertificacion";
import ViewCertificado from "./views/ViewMenuStudent/ViewCertificado";
import ViewModuloClases from "./views/ViewMenuStudent/ViewsLevels/ViewModuloClases";
import ViewGrupoDetailUser from "./views/ViewMenuStudent/ViewsLevels/ViewGrupoDetailUser";
import ViewMyPost from "./views/ViewMenuStudent/ViewMyPost";

//imports admins
import ViewDashBoardAdmin from "./views/ViewAdmin/ViewDashBoardAdmin";
import ViewAdminCursos from "./views/ViewAdmin/ViewAdminCursos";
import ViewRoles from "./views/ViewAdmin/ViewRoles";
import ViewCursosAndUsers from "./views/ViewAdmin/ViewCursosAndUsers";
import ViewClasesAdmin from "./views/ViewAdmin/ViewClasesAdmin";
import CursoEdit from "./Components/Admin/Cursos/CursoEdit";
import ViewAdminClasesTalleresPDF from "./views/ViewAdmin/ViewAdminClasesTalleresPDF";
import ViewCrearTalleres from "./views/ViewAdmin/ViewCrearTalleres";
import ViewUsersDeleted from "./views/ViewAdmin/ViewUsersDeleted";
import ViewCursosEliminados from "./views/ViewAdmin/ViewCursosEliminados";
import ViewAdminTestimonio from "./views/ViewAdmin/ViewAdminTestimonio";
import ViewUsersAndCursos from "./views/ViewAdmin/ViewUsersAndCursos";
import ViewAdminBlogs from "./views/ViewAdmin/ViewAdminBlogs";
import ViewBlogDetailsAdmin from "./views/ViewAdmin/ViewBlogDetailsAdmin";
import ViewBlogCreate from "./views/ViewAdmin/ViewBlogCreate";
import ViewAdminAbautCreate from "./views/ViewAdmin/ViewAdminAbautCreate";
import ViewAdminAbautActualizar from "./views/ViewAdmin/ViewAdminAbautActualizar";
import ViewAdminAbaut from "./views/ViewAdmin/ViewAdminAbaut";
import ViewAjustesAdmin from "./views/ViewAdmin/ViewAjustesAdmin";
import Viewinformacion from "./views/Viewinformacionn/Viewinformacion";
import ViewNoticias from "./views/ViewAdmin/ViewNoticias";
import ViewAnalyticsUsers from "./views/ViewAdmin/ViewAnalyticsUsers";
import ViewAdminPage from "./views/ViewAdmin/ViewAdminPage";
import ViewCreateEgresados from "./views/ViewEgresados/ViewCreateEgresados";
import ViewEgresadosAdmin from "./views/ViewAdmin/ViewEgresadosAdmin";
import ViewEgresadosEdit from "./views/ViewAdmin/ViewEditEgresados";
import ViewProfeticosAdmin from "./views/ViewAdmin/ViewProfeticosAdmin";
import ViewProfeticoEdit from "./views/ViewAdmin/ViewProfeticoEdit";
import ClasesDetailModulo from "./Components/Admin/ClasesModuloAdmin/ClasesDetailModulo";
import ClaseModuloCreate from "./Components/Admin/ClasesModuloAdmin/ClasesModuloCreate";
import ClaseEditAdmin from "./Components/Admin/ClasesModuloAdmin/ClasesEditAdmin";
import ViewNivelDeleteAdmin from "./views/ViewAdmin/ViewNivelAdmin/ViewNivelDeleteAdmin";
import ViewNivelAdmin from "./views/ViewAdmin/ViewNivelAdmin/ViewNivelAdmin";
import ViewNivelDetailAdmin from "./views/ViewAdmin/ViewNivelAdmin/ViewNivelDetailAdmin";
import ViewModuloDetailAdmin from "./views/ViewAdmin/ViewNivelAdmin/ViewModuloDetailAdmin";
import NivelesDetail from "./Components/Niveles/NivelesDetail";
import ModuloDetail from "./Components/ModulosNivel/ModuloDetail";
import NivelClasesDetail from "./Components/NivelClases/NivelClasesDetail";
import ViewCampainAdmin from "./views/ViewAdmin/ViewCampain&Landings/ViewCampainAdmin";
import ViewAllUsersCampain from "./views/ViewAdmin/ViewCampain&Landings/ViewAllUsersCampain";
import ViewUsersCampain from "./views/ViewAdmin/ViewCampain&Landings/ViewUsersCampain";
import ViewLandingCampain from "./views/ViewAdmin/ViewCampain&Landings/ViewLandingCampain";
import ViewCrearLanding from "./views/ViewAdmin/ViewCampain&Landings/ViewCrearLanding";
import ViewTransmisionAdmin from "./views/ViewAdmin/ViewTransmision/ViewTransmisionAdmin";
import TemplateCampain1 from "./Components/Admin/CampainsAdmin/LandingsCampains/TemplatesCampains/TemplateCampain1";
import ViewLanding from "./views/ViewAdmin/ViewCampain&Landings/ViewLanding";
import ViewSelectFormLanding from "./views/ViewAdmin/ViewCampain&Landings/ViewSelectFormLanding";
import ViewPlatillaCurso from "./views/ViewAdmin/ViewCampain&Landings/ViewPlatillaCurso";
import ViewPlantillaCampain from "./views/ViewAdmin/ViewCampain&Landings/ViewPlantillaCampain";
import ViewBlogEdit from "./views/ViewAdmin/ViewBlogsEdit";
import ViewCreateLandingCursos from "./views/ViewAdmin/ViewCampain&Landings/ViewCreateLandingCursos";
import ViewLandingCursos from "./views/ViewAdmin/ViewCampain&Landings/ViewLandingCurso";
import ViewUserDatos from "./views/ViewAdmin/ViewUserDatos/ViewUserDatos";
import UserDatosDetail from "./Components/Admin/AllUsersAdmin/UsersDatos/UserDatosDetail";
import ViewSeguimientoClases from "./views/ViewAdmin/ViewSeguimientoClases/ViewSeguimientoClases";
import ViewCursosCerticar from "./views/ViewAdmin/ViewCertificacion/ViewCursosCertificar";
import ViewUsersCertificados from "./views/ViewAdmin/ViewCertificacion/ViewUsersCertificados";
import Viewadminvideo from "./views/ViewAdmin/Viewadminvideo";
import ViewGrupos from "./views/ViewAdmin/ViewGrupos/ViewGrupos";
import ViewDetailGrupo from "./views/ViewAdmin/ViewGrupos/ViewDetailGrupo";
import ModuloEditAdmin from "./Components/Admin/ModuloAdmin/ModuloEditAdmin";
import AgregarCurso from "./Components/Admin/Cursos/AgregarCurso";
import UserDetail from "./Components/Admin/UserDetail/UserDetail";
import AgregarClases from "./Components/Admin/Clases/AgregarClases";
import ViewRegistroActividad from "./views/ViewAdmin/ViewRegistroActividad/ViewRegistroActividad";
import ViewSelectedCertificado from "./views/ViewAdmin/ViewCertificacion/ViewSelectedCertificados";

//imports editor
import ViewEscritorioEditor from "./views/ViewEditor/ViewEscritorioEditor";
import ViewBlogEditor from "./views/ViewEditor/ViewBlogsEditor";
import ViewCrearBlogEditor from "./views/ViewEditor/ViewCrearBlogEditor";
import ViewEditarBlogEditor from "./views/ViewEditor/ViewEditarBlogEditor";
import ViewVerBlogEditor from "./views/ViewEditor/ViewVerBlogEditor";
import ViewCursosEditor from "./views/ViewEditor/ViewCursosEditor";
import ViewCursosDetailsEditor from "./views/ViewEditor/ViewCursosDetailsEditor";
import ViewTransmisionEditor from "./views/ViewEditor/ViewTransmisionEditor";
import ViewEditorAjustes from "./views/ViewEditor/ViewEditorAjustes";
import ViewAsisteciaEditor from "./views/ViewEditor/ViewAsisteciaEditor";

//imports componentes
import Clases from "./Components/Cursos/Cursos";
import ViewClases from "./views/ViewClases/ViewClases";
import ViewClasesTalleresPDF from "./views/ViewClases/ViewClasesTalleresPDF";
import HomeComunidadView from "./views/ViewComunidad/home/HomeComunidadView";
import UserList from "./Components/Comunidad/UserCardSocial/UserList";
import userData from "./Components/Comunidad/UserCardSocial/userData";
import Message from "./Components/Comunidad/Message/Message";
import AgregarAmigo from "./Components/Comunidad/AgregarAmigo/AgregarAmigo";
import ViewChat from "./views/ViewComunidad/chat/ViewChat";
import ViewClasesUser from "./views/ViewCursoUser/ViewCursoUser";
import Viewdetailsentrenamiento from "./views/Viewdetailsentrenamiento/Viewdetailsentrenamiento";
import ViewFormProfetico from "./views/ViewCompProfeticos/ViewFormProfetico";

import Loading from "./Components/Loading";

//import Cursos from "./Components/Admin/Cursos/Cursos";
//import Entrenamiento from "./Components/Entrenamiento/Entrenamiento";
//import ClaseDetail from "./Components/Admin/Clases/ClaseDetail";
//import ModuloDetailUser from "./Components/Estudiante/EstudianteNiveles/ModuloDetailUser";
//import ViewModuloClases from "./views/ViewMenuStudent/ViewsLevels/ViewModuloClases";

import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "https://apillave-ebd57605aa78.herokuapp.com/";  

const isLoggedIn = localStorage.getItem("isLoggedIn");
const userRole = localStorage.getItem("userRole");

function App() {
    const [loading, setLoading] = useState(true);
    const [setRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            // Simula una llamada a la API para obtener el rol del usuario
            setLoading(true);
            try {
                // Aquí puedes hacer una solicitud a tu API para obtener el rol del usuario
                // Por ahora, usaremos localStorage como un ejemplo
                const storedRole = localStorage.getItem("userRole");
                setRole(storedRole);
            } catch (error) {
                console.error("Error fetching user role:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, []);

    if (loading) {
        return <Loading />;
    }

  return (
    <Router>
      <Routes>

      {(userRole === "client" || userRole === "admin" || userRole === "SuperAdmin") && (
          <>
            <Route path="/estudiante/Escritorio" element={isLoggedIn ? <ViewMenuStudent /> : <Navigate to="/login" />} />
            <Route path="/estudiante/profile" element={isLoggedIn ? <ViewProfile /> : <Navigate to="/login" />} />
            <Route path="/estudiante/cursosInscritos" element={isLoggedIn ? <ViewCursosInscritos /> : <Navigate to="/login" />} />
            <Route path="/estudiante/Ajustes" element={isLoggedIn ? <ViewAjustes /> : <Navigate to="/login" />} />
            <Route path="/estudiante/Preguntas&Respuestas" element={ isLoggedIn ? <ViewPreguntasRespuestas /> : <Navigate to="/login" /> } />
            <Route path="/estudiante/NivelInscrito" element={isLoggedIn ? <ViewNivelesInscitos /> : <Navigate to="/login" />} />
            <Route path="/estudiante/NivelesDetails/:id" element={isLoggedIn ? <ViewLevelsDetails /> : <Navigate to="/login" />} />
            <Route path="/estudiante/nivel/:nivelId/modulo/:moduloId" element={ isLoggedIn ? <ViewModuloDetailsUser /> : <Navigate to="/login" />} />
            <Route path="/estudiante/datosLegales" element={isLoggedIn ? <ViewCertificacion /> : <Navigate to="/login" />} />
            <Route path="/estudiante/certificados" element={isLoggedIn ? <ViewCertificado /> : <Navigate to="/login" />} />
          </>
        )}

        {/* Rutas página Admins */}
        {(userRole === "admin" || userRole === "SuperAdmin") && (
          <>
            <Route path="/admin" element={isLoggedIn ? <ViewDashBoardAdmin /> : <Navigate to="/login" />} />
            <Route path="/admin/cursos" element={isLoggedIn ? <ViewAdminCursos /> : <Navigate to="/login" />} />
            <Route path="/admin/roles" element={isLoggedIn ? <ViewRoles /> : <Navigate to="/login" />} />
            <Route path="/admin/curso/:id" element={isLoggedIn ? <ViewClasesAdmin /> : <Navigate to="/login" />} />
            <Route path="/admin/cursos/edit/:id" element={isLoggedIn ? <CursoEdit /> : <Navigate to="/login" />} />
            <Route path="/admin/cursos/:id/clases/:claseId/pdf" element={isLoggedIn ? <ViewAdminClasesTalleresPDF /> : <Navigate to="/login" />} />
            <Route path="/admin/cursos/crearTaller" element={isLoggedIn ? <ViewCrearTalleres /> : <Navigate to="/login" />} />
            <Route path="/admin/usersDeleted" element={isLoggedIn ? <ViewUsersDeleted /> : <Navigate to="/login" />} />
            <Route path="/admin/cursosDeleted" element={isLoggedIn ? <ViewCursosEliminados /> : <Navigate to="/login" />} />
            <Route path="/admin/testimonios" element={isLoggedIn ? <ViewAdminTestimonio /> : <Navigate to="/login" />} />
            <Route path="/admin/cursos/users-cursos" element={isLoggedIn ? <ViewUsersAndCursos /> : <Navigate to="/login" />} />
            <Route path="/admin/cursos/cursos-users" element={isLoggedIn ? <ViewCursosAndUsers /> : <Navigate to="/login" />} />
            <Route path="/admin/blogs" element={isLoggedIn ? <ViewAdminBlogs /> : <Navigate to="/login" />} />
            <Route path="/admin/blogDetails/:blogId" element={isLoggedIn ? <ViewBlogDetailsAdmin /> : <Navigate to="/login" />} />
            <Route path="/Admin/CrearNosostros" element={isLoggedIn ? <ViewAdminAbautCreate /> : <Navigate to="/login" />} />
            <Route path="/Admin/EditarNosotros/:id" element={isLoggedIn ? <ViewAdminAbautActualizar /> : <Navigate to="/login" /> } />
            <Route path="/Admin/Nosotros" element={isLoggedIn ? <ViewAdminAbaut /> : <Navigate to="/login" /> } />
            <Route path="/admin/ajustes" element={isLoggedIn ? <ViewAjustesAdmin /> : <Navigate to="/login" />} />
            <Route path="/admin/informacion" element={isLoggedIn ? <Viewinformacion /> : <Navigate to="/login" /> } />
            <Route path="/admin/noticias" element={isLoggedIn ? <ViewNoticias /> : <Navigate to="/login" />} />
            <Route path="/admin/AnalyticsUser" element={isLoggedIn ? <ViewAnalyticsUsers /> : <Navigate to="/login" />} />
            <Route path="/admin/egresados/crear" element={isLoggedIn ? <ViewCreateEgresados /> : <Navigate to="/login" /> } />
            <Route path="/AdminPage" element={isLoggedIn ? <ViewAdminPage /> : <Navigate to="/login" />} />
            <Route path="/admin/egresados" element={isLoggedIn ? <ViewEgresadosAdmin /> : <Navigate to="/login" /> } />
            <Route path="/admin/egresados/edit/:id" element={isLoggedIn ? <ViewEgresadosEdit /> : <Navigate to="/login" /> } />
            <Route path="/admin/profetico" element={isLoggedIn ? <ViewProfeticosAdmin /> : <Navigate to="/login" />} />
            <Route path="/admin/profetico/edit/:id" element={isLoggedIn ? <ViewProfeticoEdit /> : <Navigate to="/login" /> } />
            <Route path="/admin/nivel/:nivelId/modulo/:moduloId/clase/:claseId" element={isLoggedIn ? <ClasesDetailModulo /> : <Navigate to="/login" /> } />
            <Route path="/admin/deleted" element={isLoggedIn ? <ViewNivelDeleteAdmin /> : <Navigate to="/login" /> } />
            <Route path="/admin/nivel/:nivelId/modulo/:moduloId/clase/create" element={isLoggedIn ? <ClaseModuloCreate /> : <Navigate to="/login" /> } />
            <Route path="/admin/nivel/:nivelId/modulo/:moduloId/clase/:claseId/editar" element={isLoggedIn ? <ClaseEditAdmin /> : <Navigate to="/login" /> } />
            <Route path="/admin/campain" element={isLoggedIn ? <ViewCampainAdmin /> : <Navigate to="/login" />} />
            <Route path="/admin/campain/AllUserCampain" element={isLoggedIn ? <ViewAllUsersCampain /> : <Navigate to="/login" /> } />
            <Route path="/admin/campain/users/:campeinId" element={isLoggedIn ? <ViewUsersCampain /> : <Navigate to="/login" />} />
            <Route path="/admin/campain/landing/:campeinId" element={isLoggedIn ? <ViewLandingCampain /> : <Navigate to="/login" /> } />
            <Route path="/admin/campain/landing/createLanding/:campeinId/:template" element={isLoggedIn ? <ViewCrearLanding /> : <Navigate to="/login" /> } />
            <Route path="/admin/transmisiones" element={isLoggedIn ? <ViewTransmisionAdmin /> : <Navigate to="/login" /> } />
            <Route path="/Admin/Blog/Editar/:id" element={isLoggedIn ? <ViewBlogEdit />: <Navigate to="/login" /> } />
            <Route path="/Admin/campain/landing/SelecForm/:campeinId" element={isLoggedIn ? <ViewSelectFormLanding /> : <Navigate to="/login" />} />
            <Route path="/Admin/campain/landing/selectPlantilla/curso/:campeinId" element={isLoggedIn ? <ViewPlatillaCurso /> : <Navigate to="/login" />} />
            <Route path="/Admin/campain/landing/selectPlantilla/:campeinId" element={isLoggedIn ? <ViewPlantillaCampain /> : <Navigate to="/login" />} />
            <Route path="/Admin/campain/createLanding/cursos/:campeinId/:template" element={isLoggedIn ? <ViewCreateLandingCursos /> : <Navigate to="/login" />}/>
            <Route path="/admin/videos" element={isLoggedIn ? <Viewadminvideo /> : <Navigate to="/login" /> } />
            <Route path="/Admin/datos" element={isLoggedIn ?<ViewUserDatos /> : <Navigate to="/login" /> } />
            <Route path="/admin/seguimiento" element={isLoggedIn ? <ViewSeguimientoClases /> : <Navigate to="/login" />} />
            <Route path="/Admin/Certificado" element={isLoggedIn ? <ViewCursosCerticar /> : <Navigate to="/login" />} />
            <Route path="/Admin/Certificado/Curso/:idCurso" element={isLoggedIn ? <ViewUsersCertificados /> : <Navigate to="/login" />} />
            <Route path="/admin/registro-actividades" element={<ViewRegistroActividad />} />
            <Route path="/admin/selectedCertificado" element={isLoggedIn? <ViewSelectedCertificado /> : <Navigate to="/login" />} />
          </>
        )}
        
        {/*Rutas pagina Editor */}
        {(userRole === "admin" || userRole === "SuperAdmin" || userRole === "editor") && (
          <>
            <Route path="/Editor" element={isLoggedIn ? <ViewEscritorioEditor /> : <Navigate to="/login" /> } />
            <Route path="/Editor/Blogs" element={isLoggedIn ? <ViewBlogEditor /> : <Navigate to="/login" />} />
            <Route path="/Editor/Blogs/CrearBlog" element={isLoggedIn ? <ViewCrearBlogEditor /> : <Navigate to="/login" />} />
            <Route path="/Editor/Blogs/EditarBlog/:id" element={isLoggedIn ? <ViewEditarBlogEditor /> : <Navigate to="/login" /> } />
            <Route path="/Editor/Blogs/VerBlog/:id" element={isLoggedIn ? <ViewVerBlogEditor /> : <Navigate to="/login" />} />
            <Route path="/Editor/Cursos" element={isLoggedIn ? <ViewCursosEditor /> : <Navigate to="/login" />}/>
            <Route path="/Editor/Cursos/CursoDetails/:id" element={isLoggedIn ? <ViewCursosDetailsEditor /> : <Navigate to="/login" />} />
            <Route path="/Editor/Transmision" element={isLoggedIn ? <ViewTransmisionEditor /> : <Navigate to="/login" />} />
            <Route path="/Editor/Ajustes" element={isLoggedIn ? <ViewEditorAjustes /> : <Navigate to="/login" /> }/>
            <Route path="/Editor/Asistencia" element={isLoggedIn ? <ViewAsisteciaEditor /> : <Navigate to="/login" />} />
          </>
        )}

        {/*Rutas pagina home libre */}
        <Route path="/" element={<ViewHome />} />
        <Route path="/RegistroUser" element={<ViewRegistro />} />
        <Route path="/login" element={<ViewLogin />} />
        <Route path="/FormObsequio" element={<ViewFormObsequio />} />
        <Route path="/PoliticasPrivacidad" element={<ViewPoliticas />} />
        <Route path="/Nosotros" element={<ViewAbaut />} />
        <Route path="/blogs" element={<ViewBlogs />} />
        <Route path="/blog/:blogId" element={<ViewBlog />} />
        <Route path="/error" element={<Error404 />} />
        <Route path="/Error404" element={<ViewErrorPaginaConstruccion />} />
        <Route path="/entrenamiento" element={<ViewEntrenamiento />} />
        <Route path="/TratamientoDeDatos" element={<ViewTratamientoDeDatos />} />
        <Route path="/Testimonios" element={<ViewTestimonios />} />
        <Route path="/Caracter" element={<ViewCaracter />} />
        <Route path="/Historia" element={<ViewHistria />} />
        <Route path="/Doctrina" element={<ViewDoctrina />} />
        <Route path="/Llamamiento" element={<ViewLlamamiento />} />
        <Route path="/Egresados" element={<ViewEgresados />} />
        <Route path="/Comunidad/NoLoged" element={<ViewHomeNoLogued />} />
        <Route path="/Registro/Obsequio" element={<ViewFormObsequioCampain />} /> 
        <Route path="/transmision" element={<ViewTransmision/>} />
        <Route path="/transmisiones" element={<ViewTransmisiones />} />
        <Route path="/transmisionDetails/:id" element={<ViewTransmisionDetails/>} /> 
        <Route path="/RegistroDatos" element={<ViewFormRegistroUsersIglesia />}/>
        {/*<Route path="/cursos" element={<Cursos />} />*/}
    
        {/*Rutas pagina no asociadas */}
        <Route path="/Comunidad" element={isLoggedIn ? <HomeComunidadView /> : <Navigate to="/Comunidad/NoLoged" />}/>
        <Route path="/blog/CrearBlog" element={isLoggedIn ? <ViewBlogCreate /> : <Navigate to="/login" />} />
        <Route path="/cursos/:id/clases/:claseId/pdf" element={isLoggedIn ? <ViewClasesTalleresPDF /> : <Navigate to="/login" />} />
        <Route path="/userDetail/:identificacion" element={isLoggedIn ? <UserDetail /> : <Navigate to="/login" />} />
        <Route path="/agregarclases" element={<AgregarClases />} />
        <Route path="/Comunidad/users" element={<UserList users={userData} />} />
        <Route path="/message" element={<Message />} />
        <Route path="/agregarAmigo" element={<AgregarAmigo />} />
        <Route path="/CrearProfetico" element={<ViewFormProfetico />} />
        <Route path="/chat-users" element={<ViewChat />} />
        <Route path="/user/curso/:id" element={<ViewClasesUser />} />
        <Route path="/my-posts" element={<ViewMyPost />} />
        <Route path="/informacion/:id" element={<Viewdetailsentrenamiento />} />
        <Route path="/agregar" element={<AgregarCurso />} />
        <Route path="/clases" element={<Clases />} />
        <Route path="/viewclases" element={<ViewClases />} />
        <Route path="/curso/:id" element={<ViewClases />} />
        <Route path="/niveladmin" element={<ViewNivelAdmin />} />
        <Route path="/nivel/:id" element={<ViewNivelDetailAdmin />} />
        <Route path="/nivel/:nivelId/modulo/:moduloId" element={<ViewModuloDetailAdmin />} />
        <Route path="/niveldetail/:id" element={<NivelesDetail />} />
        <Route path="/niveles/:id/grupos" element={<ViewGrupos />} />
        <Route path="/niveles/:id/grupos/:grupoId" element={<ViewDetailGrupo />} />
        <Route path="/nivel/:nivelId/modulo/:moduloId/edit" element={<ModuloEditAdmin />} />
        <Route path="/home/nivel/:nivelId/modulo/:moduloId" element={<ModuloDetail />} />
        <Route path="/modulo/:moduloId/clase/:claseId" element={<NivelClasesDetail />} />
        <Route path="/nivel/:nivelId/grupo/:grupoId/detalles" element={<ViewGrupoDetailUser/>} />
        <Route path="/nivel/:nivelId/grupo/:grupoId/modulo/:moduloId/detalles" element={<ViewModuloClases/>} />
        <Route path="/Template" element={<TemplateCampain1 />} />
        <Route path="/campain/:landingId/Landing/:campeinId/:template" element={<ViewLanding />} />
        <Route path="/campain/:landingId/Landing/:campeinId/:template/curso/:idcurso" element={<ViewLandingCursos />} />
        <Route path="/dato/:id" element={<UserDatosDetail />} />

        {/*Ruta de error cuando un rol no pertenece a su ruta */}
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </Router>
  );
}

export default App;