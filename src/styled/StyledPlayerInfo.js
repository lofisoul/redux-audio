import styled from 'styled-components';

const StyledPlayerInfo = styled.div`
	display: flex;
	align-items: center;
	flex: 2;
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
		font-size: 1.2rem;
		padding-left: 8px;
		& > div {
			display: block;
			display: -webkit-box;
			max-width: 400px;
			line-height: 1;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		@media (min-width: 450px) {
			display: block;
		}
		& label {
			display: inline-block;
			background: #253540;
			color: #fff;
			display: inline-block;
			width: auto;
			padding: 0 0.5rem;
			font-size: 1.1rem;
			margin-bottom: 4px;
		}
	}
`;

export default StyledPlayerInfo;
