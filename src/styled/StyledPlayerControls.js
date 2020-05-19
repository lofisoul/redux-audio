import styled from 'styled-components';

const StyledPlayerControls = styled.div`
	flex: 1 0 160px;
	max-width: 160px;
	& button {
		border: 0;
		font-size: 1.8rem;
		padding: 5px 5px;
		margin-left: 5px;
		@media (min-width: 576px) {
			font-size: 2.5rem;
		}
	}
`;

export default StyledPlayerControls;
