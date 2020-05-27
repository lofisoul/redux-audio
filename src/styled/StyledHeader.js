import styled from 'styled-components';

const StyledHeader = styled.header`
	padding: 1rem 3rem;
	background-color: #fff;
	box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.07);
	display: flex;
	justify-content: space-between;
	align-content: center;
	& h1 {
		margin: 0;
	}
`;

export default StyledHeader;