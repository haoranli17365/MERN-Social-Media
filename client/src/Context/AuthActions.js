// Action: Login Start
export const LoginStart = (userCredentials) =>({
    type: "LOGIN_START",
});
// Action: Login Sucess
export const LoginSuccess = (user) =>({
    type: "LOGIN_SUCESS",
    payload: user,
});
// Action: Login Fail
export const LoginFailure = (error) =>({
    type: "LOGIN_FAIL",
    payload: error,
});


// Action: Follow
export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
})

// Action: Unfollow
export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
})