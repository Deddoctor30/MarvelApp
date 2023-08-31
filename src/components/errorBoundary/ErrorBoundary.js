import { Component } from "react";
import Error from "../onError/Error";

class ErrorBoundary extends Component {
   state = {
      error: false
   }

   componentDidCatch(error, errInfo) {
      console.log(error, errInfo);
      this.setState({
         error: true
      })
   }

   render() {
      if (this.state.error) {
         return <Error/>
      }
      return this.props.children; 
   }
}

export default ErrorBoundary;