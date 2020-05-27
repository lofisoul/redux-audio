import React from 'react';
import {connect} from 'react-redux';
import Alert from './styled/Alert';

const AlertList = ({errorMsgs}) => {
	return (
		<>
			{errorMsgs.length > 0 && (
				<div>
					{errorMsgs.map((errorMsg, index) => (
						<Alert errorMsg={errorMsg} key={index} index={index} />
					))}
				</div>
			)}
		</>
	);
};

const mapStateToProps = state => ({
	errorMsgs: state.errorMsgs,
});

export default connect(mapStateToProps)(AlertList);
