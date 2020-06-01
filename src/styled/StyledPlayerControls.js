import styled from 'styled-components';

const StyledPlayerControls = styled.div`
	& button {
		border: 0;
		font-size: 1.8rem;
		padding: 5px 5px;
		margin-left: 5px;
		background: none;
		@media (min-width: 576px) {
			font-size: 2.5rem;
		}
	}
`;

export default StyledPlayerControls;
