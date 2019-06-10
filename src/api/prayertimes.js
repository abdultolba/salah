import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.pray.zone/v2'
});