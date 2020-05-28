import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {removeError} from '../store/actions';

const StyledAlert = styled.div`
	padding: 1rem 0;
	background: #fff6b7;
	margin-top: 1rem;
	margin-bottom: 1rem;
	position: relative;
	& .inner {
		display: flex;
		justify-content: flex-start;
		align-items: start;
		font-size: 1.3rem;
		line-height: 1.4;
		& > div {
			align-self: center;
			padding: 0 15px;
		}
		& p {
			margin: 0;
		}
		& .fas {
			font-size: 2.5rem;
		}
	}
	& button {
		font-size: 2rem;
		background: none;
		border: 0;
		cursor: pointer;
		color: #a09b73;
		padding: 0 1.5rem 1.5rem;
		margin-left: auto;
	}
`;

const Alert = ({errorMsg, index, removeError}) => {
	const clearError = e => {
		let errorIndex = e.target.parentNode.dataset.erroridx;
		removeError(errorIndex);
	};

	return (
		<StyledAlert data-erroridx={index}>
			<div className="inner">
				<div>
					<i className="fas fa-exclamation-circle"></i>
				</div>
				<div>
					<p>{errorMsg}</p>
				</div>
				<button onClick={clearError}>&times;</button>
			</div>
		</StyledAlert>
	);
};

const mapStateToProps = null;
const mapDispatchToProps = {removeError};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
