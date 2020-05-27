import styled from 'styled-components';

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
	}
`;

export default StyledList;
