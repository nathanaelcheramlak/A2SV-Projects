export const signup = async (data: any) => {
	const response = await fetch("https://akil-backend.onrender.com/signup", {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(data),
	});

	return response.json();
};

export const verifyEmail = async (data: any) => {
	const response = await fetch(
		"https://akil-backend.onrender.com/verify-email",
		{
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	return response.json();
};
