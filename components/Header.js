//elements in components are to be reused several times

import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
  return (
    <Menu style={{ marginTop: "15px" }}>

        <Link route='/' >
            <a className='item'>
                Pangea SBT
            </a>
        </Link>

        <Menu.Menu position="left">
      
       
        
      </Menu.Menu>


    </Menu>
  );
};
