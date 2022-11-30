import styled from 'styled-components';

const StyledTimer = styled.div`
	display: flex;
	font-size: 1.4rem;
	align-items: center;
	height: 31px;
	padding: 0 !important;
	order: -1;
	width: 100%;
	flex-basis: 100%;
	position: absolute;
	top: -14px;
	left: 0;
	@media (min-width: 768px) {
		flex: 3;
		padding: 0 15px !important;
		order: initial;
		width: auto;
		flex-basis: auto;
		position: relative;
		top: auto;
		left: auto;
	}
	& #player-time-current,
	& #player-time-duration {
		opacity: 0;
		width: 0;
		@media (min-width: 768px) {
			opacity: 1;
			width: auto;
		}
	}
	& #player-timeline {
		flex: 1;
		display: flex;
		position: relative;
		align-items: center;
		cursor: pointer;
		height: 100%;
		@media (min-width: 768px) {
			margin: 0 8px;
		}
	}
	& .timeline {
		width: 100%;
		background: #ffdaab;
		height: 3px;
		@media (min-width: 768px) {
			height: 1px;
			background: #eee;
		}
	}
	& #progress-bar {
		position: absolute;
		height: 3px;
		background-color: #47c19c;
		@media (min-width: 768px) {
			height: 1px;
		}
	}
	& #player-timeline button {
		position: absolute;
		border: 0;
		padding: 0;
		background-color: #47c19c;
		height: 12px;
		margin-left: -4px;
		width: 12px;
		border-radius: 100%;
		box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
		z-index: 3;
		@media (min-width: 768px) {
			opacity: 1;
		}
	}
`;

export default StyledTimer;
