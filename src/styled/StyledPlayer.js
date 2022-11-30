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
	& > div {
		max-width: 1600px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		padding: 5px 5px calc(5px + env(safe-area-inset-bottom));
		height: 100%;
		border-top: 3px solid #afe3d3;
		& > div {
			padding: 0 15px;
		}
	}
`;
export default StyledPlayer;
