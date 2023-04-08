import {createBrowserRouter,} from "react-router-dom";
import { ErroPage } from "./error/ErrorPage";
import { Pessoa } from "../pages/pessoa/pessoa-lista/Pessoa";
import { PessoaDetalhe } from "../pages/pessoa";

export const Router = createBrowserRouter([
    {
      path: "/",
      element:<Pessoa/>,
      errorElement:<ErroPage/>
    },
    {
        path: "/pessoa/detalhe/:id",
        element:<PessoaDetalhe/>,
        errorElement:<ErroPage/>
     }
  ]);