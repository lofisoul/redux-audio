import styled, {keyframes} from 'styled-components';

const fadeIn = keyframes`
0% {
    transform: translateY(30px);
    opacity:0;
} 
100% {
    opacity:1;
}
`;

const StyledList = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
	& > li {
		display: flex;
		flex-direction: row;
		border-radius: 7px;
		box-shadow: 5px 5px 0px 1px rgba(0, 0, 0, 0.5);
		height: 125px;
		background: #fff;
		margin-bottom: 2rem;
		overflow: hidden;
		animation-name: ${fadeIn};
		animation-duration: 200ms;
		animation-delay: calc(var(--animation-order) * 50ms);
		animation-fill-mode: both;
		animation-timing-function: ease-in-out;
		transition: 0.3s;

		&.active {
			box-shadow: 0px 0px 0px 3px #ffdaab, 5px 5px 0px 1px rgba(0, 0, 0, 50%);
			
			.user-img {
				background: #ffdaab;
			}

			.track-img .fas {
				opacity: 1;
			}
	}
`;

export default StyledList;
