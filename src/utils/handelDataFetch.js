const handelDataFetch = async ({ path, method, body = null }, setShowAnimation) => {
    const apiUrl = 'https://plant-backend-dusky.vercel.app' + path;
    const token = localStorage.getItem('token');

    try {
        setShowAnimation({ type: "ANIMATION", showAnimation: true });

        // Check if token exists and is valid
        if (!token) {
            throw new Error('No token found');
            
        }
        console.log(token);

        // Make the fetch request with the Authorization header
        const res = await fetch(apiUrl, {
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
            body: body === null ? null : JSON.stringify(body)
        });

        // Check if response is successful
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        return await res.json();
    } catch (error) {
        console.error('Error in API request:', error);
        // Handle error here, e.g., show error message to the user
    } finally {
        setShowAnimation({ type: "ANIMATION", showAnimation: false });
    }
}

export default handelDataFetch;
