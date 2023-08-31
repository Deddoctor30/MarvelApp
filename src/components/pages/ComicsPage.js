import AppBanner from "../appBanner/AppBanner";
import Comics from "../comics/Comics";
import { Helmet } from "react-helmet";

const ComicsPage = () => {
   return (
      <>
         <Helmet>
         <meta
            name="description"
            content="Our comics page"
            />
         <title>Comics Page</title>
         </Helmet>
         <AppBanner/>
         <Comics/>
      </>
   )
}

export default ComicsPage;