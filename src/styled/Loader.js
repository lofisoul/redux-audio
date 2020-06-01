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
	0% {color:#FFEFA0}
	20% {color:#FFD9AA}
	50% {color: #FFA5AB}
	80% {color:#FFD9AA}
	100% {color:#FFEFA0}
`;

const SpinDiv = styled.div`
	text-align: center;
	font-size: 4rem;
	& > i {
		animation: ${spinner} 2s linear infinite,
			${colors} 5s ease-in-out infinite;
	}
`;

const Loader = () => {
	return (
		<SpinDiv>
			<i className="fas fa-compact-disc"></i>
		</SpinDiv>
	);
};

export default Loader;
