import {RootStore} from "./rootStore";
import {makeAutoObservable} from 'mobx';
import {request} from './../request';


class AuthStore {
    rootStore: RootStore;
    isAuth: boolean = false;
    error: undefined | string = undefined;
    currentTime: number = 0;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    async login(username: string, password: string) {
        const res = await request('/login', 'POST', {}, {username, password});
        if (res.success) {
            this.setIsAuth(true);
            this.setError(undefined);
            localStorage.setItem('roles', res.payload.roles);
            localStorage.setItem('authTime', String(+Date.now()));
            localStorage.setItem('username', res.payload.username);
            localStorage.setItem('accessToken', res.payload.access_token);
        }
        if (!res.success) {
            res.error ? this.setError(res.error) : this.setError('Проверьте корректность введённых данных');
        };
    }

    logout() {
        this.setIsAuth(false);
        localStorage.removeItem('roles');
        localStorage.removeItem('authTime');
        localStorage.removeItem('username');
        localStorage.removeItem('accessToken');
    }

    setCurrentTime(time: number) {this.currentTime = time}

    setIsAuth(isAuth: boolean) {this.isAuth = isAuth}

    setError(err: string | undefined) {this.error = err}
}

export default AuthStore;