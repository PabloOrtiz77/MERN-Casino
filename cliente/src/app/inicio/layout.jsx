import Navbar from "@/components/Navbar/Navbar";
import { Container } from "@mui/material";
import { Fragment } from "react";


 export default function RootLayoutTienda({ children }) {
    return (
      <Fragment>
        
          <Navbar/>
          {children}
        
    </Fragment> 
    );
  }
  