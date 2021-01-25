import styled from 'styled-components';

import { Link } from 'react-router-dom';


export const HeaderContainer = styled.div`
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  
  @media screen and (max-width: 800px) {
    height: 60px;
    padding: 10px;
    margin-bottom: 20px;
  }
`;

export const LogoContainer = styled(Link)`
    height: 100%;
    margin: 20px 10px;
    
    @media screen and (max-width: 800px) {
        width: 50px;
        padding: 0px;
        margin: 0px ;
        position: relative;
        align-content: center;
        
        & svg.logo {
            width: 50px;
            height: auto;
        }
    }
`

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    
    @media screen and (max-width: 800px) {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
  }
`

export const OptionLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;

`
