import styled, {keyframes} from 'styled-components';
import React from 'react';

const spinner = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform:rotate(360deg)
    }
`;

const colors = keyframes`
	0% {color:#fff}
	25% {color:#ffd800}
	50% {color: #aadaf7}
	75% {color:#aaf7c6}
	100% {color:#fff}
`;

const SpinDiv = styled.div`
	text-align: center;
	font-size: 4rem;
	& > i {
		animation: ${spinner} 2s linear infinite,
			${colors} 4s ease-in-out infinite;
	}
`;

const Loader = () => {
	return (
		<SpinDiv>
			<i class="fas fa-compact-disc"></i>
		</SpinDiv>
	);
};

export default Loader;
