import styled from 'styled-components';

const StyledForm = styled.form`
	max-width: 450px;
	margin: 0 auto;
	& input[type='text'] {
		display: block;
		width: 100%;
		padding: 0.375rem 0.75rem;
		font-size: 1.6rem;
		line-height: 1.5;
		color: #495057;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		border-radius: 0.25rem;
		max-width: 450px;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		margin-bottom: 0.5rem;
		&::placeholder {
			color: #cecece;
			font-size: 1.6rem;
			font-style: italic;
		}
		&:focus {
			color: #495057;
			background-color: #fff;
			border-color: #80bdff;
			outline: 0;
			box-shadow: 0 0 0 0.2rem rgba(14, 49, 125, 0.25);
		}
		& + em {
			font-size: 0.9rem;
			display: block;
			margin-bottom: 1rem;
			color: #444;
			margin-bottom: 1rem;
			& > span {
				background: #ffd9aa;
			}
			@media (min-width: 450px) {
				font-size: 1rem;
			}
		}
	}

	& label {
		font-size: 1.4rem;
		font-weight: 500;
		margin-bottom: 1rem;
		display: block;
		text-align: center;
	}
`;

export default StyledForm;
