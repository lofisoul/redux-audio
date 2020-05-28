import React from 'react';

const PlaylistFilter = ({onChangeHandler}) => {
	return (
		<form>
			<input
				type="radio"
				id="you"
				name="you"
				value="1"
				onChange={onChangeHandler}
			/>
			<label htmlFor="you">You</label>
			<br />
			<input
				type="radio"
				id="recommended"
				name="recommended"
				value="2"
				onChange={onChangeHandler}
			/>
			<label htmlFor="recommended">Recommended</label>
			<br />
			<input
				type="radio"
				id="noFilter"
				name="noFilter"
				value="0"
				onChange={onChangeHandler}
			/>
			<label htmlFor="noFilter">No Filter</label>
			<br />
		</form>
	);
};

export default PlaylistFilter;
