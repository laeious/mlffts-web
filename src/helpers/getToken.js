 const getToken = () => {
    return localStorage.getItem('mlffts-jwt');
}

export default getToken;