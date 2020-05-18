import styled from 'styled-components';

const StyledPlayer = styled.div`
	position: fixed;
	bottom: 0;
	background: #fff;
	height: ${props => (props.currentTrack ? '70px' : '0')};
	width: 100%;
	left: 0;
	transition: height 0.2s cubic-bezier(0, 0.42, 0.76, 1.27);
	z-index: 5;
	& > {
		max-width: 1000px;
		margin: 0 auto;
	}
`;
export default StyledPlayer;
