import {useEffect} from 'react';

//set the token and the refresh token in localStorage
//create an expire time to check refresh token

export function useSoundcloud() {
	const tokenURL = `https://api.soundcloud.com/oauth2/token?grant_type=client_credentials&client_id=41aceb0d516e657897a0eb7ab22c9f99&client_secret=3637e5ba852bf8d02a7714d22e486854`;
	const refreshURL = `https://api.soundcloud.com/oauth2/token?grant_type=refresh_token&client_id=41aceb0d516e657897a0eb7ab22c9f99&client_secret=3637e5ba852bf8d02a7714d22e486854&refresh_token=`;

	useEffect(() => {
		console.log('USER');
		console.log(localStorage);
		if (!localStorage.accessToken) {
			console.log('fetch');
			fetch(tokenURL, {
				headers: {
					Accept: 'application/json; charset=utf-8',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				method: 'POST',
			})
				.then(res => res.json())
				.then(data => {
					console.log(data);
					const now = new Date();
					const tokenExpire = new Date(
						now.getTime() + data.expires_in * 1000,
					);
					localStorage.setItem('accessToken', data.access_token);
					localStorage.setItem('refreshToken', data.refresh_token);
					localStorage.setItem('expires', tokenExpire);
				});
		}
	}, [tokenURL, refreshURL]);
}
