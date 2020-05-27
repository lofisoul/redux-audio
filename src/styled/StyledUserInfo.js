import styled from 'styled-components';

const StyledUserInfo = styled.div`
    border-radius: 6px 0 0 6px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    position: relative;
    max-width: ${props => (props.isOpen ? 'none' : '250px')};
    transition: max-width 0.2s;
    transition-timing-function: cubic-bezier(0, 0.42, 0.76, 1.27);
    @media (min-width:576px) {
        max-width: ${props => (props.isOpen ? 'none' : '280px')};
    }
	& .user-img {
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        z-index: 2;
        cursor: pointer;
        transition: 0.3s;
        background: #082520;
        border-radius: ${props => (props.isOpen ? '0px' : '6px 0 0 6px')};
        padding: 10px;
        &:hover {
            background: #0d3e35;
        }
        & img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border:3px solid #092b25;
            @media (min-width: 576px) {
                width: 60px;
                height: 60px;
            }
        }
    }
	& .user-drawer {
        width: ${props => (props.isOpen ? '200px' : '0')};
        padding: ${props => (props.isOpen ? '10px' : '0')};
        border-radius: 6px 0 0 6px;
        transition: width 0.2s;
        transition-timing-function: cubic-bezier(0, 0.42, 0.76, 1.27);
        position: relative;
        z-index: 1;
        opacity: ${props => (props.isOpen ? '1' : '0')};
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        background-image: url(data:image/png;base64,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);
        background-color: #fff;
        & h3 {
            margin: 0 0 1rem;
            font-weight: 800;
            font-size: 1.5rem;
            display: block; /* Fallback for non-webkit */
            display: -webkit-box;
            max-width: 400px;
            /*height: $font-size * $line-height * $lines-to-show; /* Fallback for non-webkit */
            font-size: 1.4rem;
            line-height: 1;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        & a {
            color: #fff;
            display: inline-block;
            background: blue;
            font-weight: 800;
            text-transform: uppercase;
            text-decoration: none;
            border-radius: 4px;
            padding: 1rem 2rem;
            font-size: 1.2rem;
            width: auto;
        }
    }
}
`;

export default StyledUserInfo;
