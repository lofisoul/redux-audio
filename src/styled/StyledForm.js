import styled from 'styled-components';

const StyledForm = styled.form`
	& input[type='text'] {
		display: block;
		width: 100%;
		padding: 0.375rem 0.75rem;
		font-size: 1.3rem;
		line-height: 1.5;
		color: #495057;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		border-radius: 0.25rem;
		max-width: 450px;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		margin-bottom: 1rem;
		&:focus {
			color: #495057;
			background-color: #fff;
			border-color: #80bdff;
			outline: 0;
			box-shadow: 0 0 0 0.2rem rgba(14, 49, 125, 0.25);
		}
	}
`;

export default StyledForm;
