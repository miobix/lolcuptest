import React from 'react';
import {Container} from 'semantic-ui-react';
import Header from './Header';

//the approach is put the whole page inside the layout, instead of injectin a header on each page
//children es todo lo q esta entre <layout> markers on the index file
export default props => {
    return(
        <Container>
            <Header />
            {props.children}     


        </Container>


    );

};