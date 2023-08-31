import Error from "../onError/Error";
import { Link } from "react-router-dom";

const Page404 = () => {
   return (
      <div style={{'textAlign': 'center', 'marginTop': '150px'}}>
         <Error/>
         <p style={{'color': 'gray', 'fontSize': '24px', 'marginTop': '30px', 'letterSpacing': '2px'}}>Данная страница не существует</p>
         <Link style={{'color': '#9F0013', 'fontSize': '18px', 'marginTop': '30px'}} to="/">Вернуться на главную страницу</Link>
      </div>
   )
}

export default Page404;