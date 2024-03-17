interface IAppConfig {
    BACKEND_URL?: string;
}

const AppConfig: IAppConfig = {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
}

export default AppConfig;