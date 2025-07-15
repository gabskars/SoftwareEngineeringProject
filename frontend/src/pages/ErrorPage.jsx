import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <div>
        <h3>Ohh! Página não encontrada</h3>
        <p>Não foi possível encontrar a página, confira a url da página!</p>
        <Link to="/dashboard">back home</Link>
      </div>
    );
  }
  return (
    <div>
      <h1>pagina de erro</h1>
      <Link to="/">BackHome</Link>
    </div>
  );
};

export default ErrorPage;
