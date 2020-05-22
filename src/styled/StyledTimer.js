import styled from 'styled-components';

const StyledTimer = styled.div`
	flex: 3;
	display: flex;
	font-size: 1.4rem;
	align-items: center;
	height: 31px;
	& #player-timeline {
		flex: 1;
		margin: 0 8px;
		display: flex;
		position: relative;
		align-items: center;
		cursor: pointer;
		height: 100%;
	}
	& .timeline {
		width: 100%;
		height: 1px;
		background: #eee;
	}
	& #progress-bar {
		position: absolute;
		height: 1px;
		background-color: #47c19c;
	}
	& #player-timeline button {
		position: absolute;
		border: 0;
		padding: 0;
		background-color: #47c19c;
		height: 8px;
		margin-left: -4px;
		width: 8px;
		border-radius: 100%;
		box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
		z-index: 3;
	}
`;

export default StyledTimer;
