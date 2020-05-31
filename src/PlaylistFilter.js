import React from 'react';
import StyledPlaylistFilter from './styled/StyledPlayListFilter';

const PlaylistFilter = ({onChangeHandler, filter}) => {
	return (
		<StyledPlaylistFilter>
			<div>Filter: </div>
			<div>
				<input
					type="radio"
					id="you"
					name="you"
					value="user"
					onChange={onChangeHandler}
					checked={filter === 'user'}
				/>

				<label htmlFor="you">
					{filter === 'user' ? (
						<i className="fas fa-check-circle"></i>
					) : (
						<i className="fas fa-circle"></i>
					)}
					You
				</label>
			</div>
			<div>
				<input
					type="radio"
					id="referral"
					name="referral"
					value="referral"
					onChange={onChangeHandler}
					checked={filter === 'referral'}
				/>

				<label htmlFor="referral">
					{filter === 'referral' ? (
						<i className="fas fa-check-circle"></i>
					) : (
						<i className="fas fa-circle"></i>
					)}
					Referral
				</label>
			</div>
			<div>
				<input
					type="radio"
					id="noFilter"
					name="noFilter"
					value="0"
					onChange={onChangeHandler}
					checked={filter === null}
				/>

				<label htmlFor="noFilter">
					{filter === null ? (
						<i className="fas fa-check-circle"></i>
					) : (
						<i className="fas fa-circle"></i>
					)}
					No Filter
				</label>
			</div>
		</StyledPlaylistFilter>
	);
};

export default PlaylistFilter;
