import {userActions} from './user-slice';
import axios from '../../axios';

export const fetchConvs = () => {
    return async (dispatch) => {
        try {

            let res = await axios.get('/convs', {headers: {Authorization: localStorage.getItem('token')}});

            if (res.status === 200) {
                dispatch(userActions.fetchConvsSuccess({
                    convs: res.data
                }));
            }

            console.log(res.data);

        } catch (e) {
            console.log(e);
        }
    }
}

export const fetchFriends = () => {
    return async (dispatch) => {
        try {

            let res = await axios.get('/users/friends', {headers: {Authorization: localStorage.getItem('token')}});

            if (res.status === 200) {
                dispatch(userActions.fetchFriendsSuccess({
                    friends: res.data
                }));
            }

            console.log(res.data);

        } catch (e) {
            console.log(e);
        }
    }
}

export const fetchRequests = () => {
    return async (dispatch) => {
        try {

            let res = await axios.get('/users/requests', {headers: {Authorization: localStorage.getItem('token')}});

            if (res.status === 200) {
                dispatch(userActions.fetchRequestsSuccess({
                    requests: res.data
                }));
            }

            console.log(res.data);

        } catch (e) {
            console.log(e);
        }
    }
}

export const contactSearch = (username) => {
    return async (dispatch) => {
        try {
            if (username) {
                let res = await axios.get('/users', {params: {username}, headers: {Authorization: localStorage.getItem('token')}});
    
                if (res.status === 200) {
                    dispatch(userActions.contactSearchSuccess({
                        contacts: res.data
                    }));
                } else {
                    dispatch(userActions.contactSearchError());
                }
    
                console.log(res.data);
            } else {
                dispatch(userActions.contactSearchError());
            }
        } catch (e) {
            dispatch(userActions.contactSearchError());
            console.log(e);
        }
    }
}

export const addContact = (_id) => {
    return async (dispatch) => {
        try {
            let res = await axios.post('/users/add', {_id}, {headers: {Authorization: localStorage.getItem('token')}});

            if (res.status === 200) {
                dispatch(userActions.contactAddSuccess({
                    contacts: res.data
                }));
            }

            console.log(res.data);

        } catch (e) {
            dispatch(userActions.loginError({error: 'Unable to add contact'}));
        }
    }
}

export const acceptContact = (_id) => {
    return async (dispatch) => {
        try {
            let res = await axios.post('/users/accept', {_id}, {headers: {Authorization: localStorage.getItem('token')}});

            if (res.status === 200) {
                dispatch(userActions.contactAcceptSuccess());
            }

            console.log(res.data);

        } catch (e) {
            dispatch(userActions.loginError({error: 'Unable to accept contact'}));
        }
    }
}

export const fetchMessages = (_id, friendId) => {
    return async (dispatch) => {
        try {
            let res = await axios.get('/convs', {params: {_id, friendId}, headers: {Authorization: localStorage.getItem('token')}});

            if (res.status === 200) {
                dispatch(userActions.fetchMessagesSuccess({
                    conv: res.data
                }));
            }

            console.log(res.data);

        } catch (e) {
            console.log(e);
        }
    }
}

export const sendMessage = (message, _id, friendId) => {
    return async (dispatch) => {
        try {
            let res = await axios.post('/convs/message', {message, _id, friendId}, {headers: {Authorization: localStorage.getItem('token')}});

            if (res.status === 201) {
                dispatch(userActions.sendMessageSuccess({
                    message,
                    conv: res.data
                }));
            }

            console.log(res.data);

        } catch (e) {
            dispatch(userActions.loginError({error: 'Unable to send message, please refresh the page and retry'}));
        }
    }
}