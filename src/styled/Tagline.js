import styled from 'styled-components';

const Tagline = styled.div`
	text-align: center;
	padding-bottom: 2rem;
	@media (min-width: 576px) {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		grid-gap: 15px;
	}
	& > div {
		margin-bottom: 2rem;
	}
	& h3 {
		margin: 0 0 1rem;
	}
	& p {
		font-size: 1.3rem;
		line-height: 1.5;
		margin: 0;
	}
	& .fas,
	& .fab {
		font-size: 3rem;
		color: #0e317d;
		@media (min-width: 576px) {
			font-size: 5rem;
		}
	}
	& .fa-soundcloud {
		color: #ffd9aa;
	}
	& .fa-random {
		color: #628ca8;
	}
	& .fa-headphones-alt {
		color: #b2e6d4;
	}
	& > div:nth-of-type(2) {
		display: none;
		@media (min-width: 576px) {
			display: block;
			align-self: center;
		}
	}
`;

export default Tagline;
