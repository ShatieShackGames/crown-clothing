import styled from "styled-components";

export const CollectionPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-between; 
    
    @media screen and (max-width: 800px) {
        margin: 20px 20px;
        align-items: center;
    }
`;

export const CollectionTitle = styled.h2`
    font-size: 38px;
    margin: 0 auto 30px;
    text-transform: uppercase;
`;

export const CollectionItems = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;

    & .collection-item {
      margin-bottom: 30px;
    }
    
    @media screen and (max-width: 800px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: 15px;
    }
`;