import styled from 'styled-components';

const StyledPlayListFilter = styled.form`
	display: flex;
	justify-content: center;
	margin-bottom: 2rem;
	align-items: center;
	@media (min-width: 576px) {
		justify-content: flex-start;
		margin: 0;
	}
	& > div {
		margin: 0 1rem;
		padding: 5px;
		border: 1px solid #f1f1f1;
		background: #fff;
		border-radius: 30px;
		&:first-child {
			font-weight: 800;
			background: none;
			border: none;
		}
	}
	& label {
		font-size: 1.4rem;
	}
	& label > i {
		margin-right: 5px;
	}
	& input[type='radio'] {
		display: none;
		& + label > i {
			color: #eee;
		}
		&:checked + label > i {
			color: #aaf7c6;
		}
	}
`;

export default StyledPlayListFilter;
