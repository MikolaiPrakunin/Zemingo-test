import axios from 'axios';

const apiClient = axios.create({
	baseURL: 'http://184.73.145.4:8085',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default apiClient;
