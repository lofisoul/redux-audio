import styled from 'styled-components';

const StyledPlayerInfo = styled.div`
	flex: auto;
	display: flex;
	height: 67px;
	max-width: 97px;
	@media (min-width: 576px) {
		flex: 2;
		max-width: 100%;
	}
	& .track-img {
		max-width: 35px;
		display: flex;
		align-items: center;
		& img {
			height: 35px;
			width: 35px;
		}
	}
	& .track-info {
		display: none;
		font-size: 1.2rem;
		padding-left: 8px;
		& label {
			display: inline-block;
			background: #222;
			color: #fff;
			display: inline-block;
			width: auto;
			padding: 0 0.5rem;
			font-size: 1.1rem;
			margin-bottom: 4px;
		}
		@media (min-width: 576px) {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
		}
	}
`;

export default StyledPlayerInfo;
