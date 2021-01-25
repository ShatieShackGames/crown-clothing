import styled from 'styled-components';
import CustomButton from "../custom-button/custom-button.component";

export const CollectionItemContainer = styled.div`
    width: 22vw;
    display: flex;
    flex-direction: column;
    height: 350px;
    align-items: center;
    position: relative;
    margin-bottom: 15px;
    

  

  &:hover {
    .image {
      opacity: 0.8;
    }

    button {
      opacity: 0.85;
      display: flex;
    }
  }
  
  @media screen and (max-width: 800px) {
    width: 40vw;
    padding: 0px;
    margin: 0px;
    
    &:hover {
    .image {
      opacity: unset;
    }

    button {
      opacity: unset;
    }
  }
  }
`;

export const AddButton = styled(CustomButton)`
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px; 
    display: none;
    
    @media screen and (max-width: 800px) {
        display: block;
        opacity: 0.9;
        min-width: unset;
        padding: 0 10px;
    }
`;

export const CollectionItemImage = styled.div`
    width: 100%;
    height: 90%;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
`;

export const CollectionFooterContainer = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    
    @media screen and (max-width: 800px) {
        padding: 8px;
    }
`;

export const CollectionItemName = styled.span`
    width: 90%;
`;

export const CollectionItemPrice = styled.span`
    width: 10%;
`;