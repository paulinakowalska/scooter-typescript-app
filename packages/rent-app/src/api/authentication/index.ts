import auth from '../../components/Auth/Auth';

export const getUser = async () => {
    try {
        const response = await fetch(`http://localhost:8080/check-if-is-logged-in`, {
            method: 'GET',
        });
        const json = await response.json();

        if (json.isLoggedIn) {
            auth.login(() => {});
        } else {
            window.location.replace(
                `http://localhost:8080${json.link}?origin=${encodeURIComponent(`http:localhost:3000/events`)}`,
            );
        }
    } catch (e) {
        console.log(e);
    }
};
