import React from 'react';

import Directory from "../../components/directory/directory.component";

import { HomePageContainer } from "./homepage.styles";
import './homepage.styles.scss';

export const Homepage = () => (
    <HomePageContainer>
        <Directory/>
    </HomePageContainer>
)