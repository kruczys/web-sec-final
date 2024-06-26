import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Securedpage";
import MooviesPage from "./pages/MooviesPage";
import PrivateRoute from "./helpers/PrivateRoute";


function App() {
 return (
   <div>
     <ReactKeycloakProvider authClient={keycloak}>
       <BrowserRouter>
       <Nav />
         <Routes>
           <Route path="/" element={<WelcomePage />} />
           <Route
             path="/secured"
             element={
               <PrivateRoute>
                 <SecuredPage />
               </PrivateRoute>
             }
           />
           <Route path="/public" element={<MooviesPage />} />
         </Routes>
       </BrowserRouter>
     </ReactKeycloakProvider>
   </div>
 );
}

export default App;