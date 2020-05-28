import styled from 'styled-components';

const StyledTrack = styled.div`
	background: #fff;
	width: 100%;
	display: flex;
	border-radius: 0 6px 6px 0;
	height: 100%;
	& .track-img {
		position: relative;
		background: #2c7873;
		width: 40px;
		transition: 0.3s background;
		cursor: pointer;
		@media (min-width: 576px) {
			width: 125px;
		}
		& img {
			display: none;
		}
		& .fas {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			color: #fff;
			transition: opacity 0.2s ease-in;
		}
		@media (min-width: 576px) {
			& img {
				display: inline-block;
				object-fit: cover;
				height: 100%;
				width: 100%;
			}
			& .fas {
				font-size: 4rem;
				opacity: 0;
			}
		}
	}
	&:hover .track-img {
		background: #6fb98f;
		@media (min-width: 576px) {
			& .fas {
				opacity: 1;
			}
		}
	}
	& .track-info {
		padding: 1rem;
		width: 100%;
		@media (min-width: 576px) {
			width: calc(100% - 118px);
		}
		& label {
			background: #222;
			color: #fff;
			display: inline-block;
			width: auto;
			padding: 0 0.5rem;
		}
		& h3 {
			margin: 1rem 0 2rem;
			display: block; /* Fallback for non-webkit */
			display: -webkit-box;
			max-width: 400px;
			/*height: $font-size * $line-height * $lines-to-show; /* Fallback for non-webkit */
			font-size: 1.8rem;
			line-height: 1;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		& .track-stats {
			margin: 0;
			padding: 0;
			list-style: none;
			display: flex;
			font-size: 1rem;
			& li {
				padding: 0 8px 0 0;
				& .fas {
					margin-right: 4px;
				}
			}
			@media (min-width: 576px) {
				font-size: 1.2rem;
				& li {
					padding: 0 15px 0 0;
				}
			}
		}
		@media (min-width: 576px) {
			&:hover .track-img .fas {
				opacity: 1;
			}
		}
	}
`;

export default StyledTrack;
