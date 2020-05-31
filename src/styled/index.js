import styled from 'styled-components';

export const Inner = styled.div`
	max-width: 1050px;
	margin: 0 auto;
	padding: 30px 15px 100px;
`;

const btnStyles = `
	border-radius: 0.25rem;
	background: #253540;
	color: #fff;
	font-weight: 800;
	border: 0;
	text-transform: uppercase;
	padding: 1rem 3rem;
	font-size: 1.3rem;
	font-family: 'Jost', sans-serif;
	text-decoration:none;
	transition:background .2s ease-in;
	cursor:pointer;
	&:hover {
		background:#638ea9;
	}
`;

export const Button = styled.button`
	${btnStyles}
`;

export const LinkButton = styled.a`
	${btnStyles}
`;
