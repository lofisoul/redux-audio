import {useEffect} from 'react';

//set the token and the refresh token in localStorage
//create an expire time to check refresh token

export function useSoundcloud() {
	const tokenURL = `https://api.soundcloud.com/oauth2/token?grant_type=client_credentials&client_id=${process.env.REACT_APP_SC_ID}&client_secret=${process.env.REACT_APP_SC_SECRET}`;
	const refreshURL = `https://api.soundcloud.com/oauth2/token?grant_type=refresh_token&client_id=${process.env.REACT_APP_SC_ID}&client_secret=${process.env.REACT_APP_SC_SECRET}&refresh_token=`;

	useEffect(() => {
		if (!localStorage.accessToken) {
			fetch(tokenURL, {
				headers: {
					Accept: 'application/json; charset=utf-8',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				method: 'POST',
			})
				.then(res => res.json())
				.then(data => {
					const now = new Date();
					const tokenExpire = new Date(
						now.getTime() + data.expires_in * 1000,
					);
					localStorage.setItem('accessToken', data.access_token);
					localStorage.setItem('refreshToken', data.refresh_token);
					localStorage.setItem('expires', tokenExpire);
				});
		}

		if (localStorage.accessToken) {
			const now = new Date();

			if (localStorage.expires < now) {
				fetch(`${refreshURL}${localStorage.refreshToken}`, {
					headers: {
						Accept: 'application/json; charset=utf-8',
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					method: 'POST',
				})
					.then(res => res.json())
					.then(data => {
						const now = new Date();
						const tokenExpire = new Date(
							now.getTime() + data.expires_in * 1000,
						);
						localStorage.setItem('accessToken', data.access_token);
						localStorage.setItem(
							'refreshToken',
							data.refresh_token,
						);
						localStorage.setItem('expires', tokenExpire);
					});
			}
		}
	}, [tokenURL, refreshURL]);
}
