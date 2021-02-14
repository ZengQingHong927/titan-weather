import          axios                   from 'axios';
import          OtcError                from './OtcError.helper';
// import        { errResCodeInfos }       from './HttpResCode.helper';
import        { generateSN }            from './Common.code.helper'

const getBaseUrl = (env) => {
        let base = {
                production:     '/',
                development:    'http://localhost:3000',
                test:           'http://localhost:3010',
        };

        if (!base) {
                base = '/';
        }

        return base[env];
};

class HttpAxiosHelper {
        constructor() {
                this.baseURL            = getBaseUrl(process.env.NODE_ENV);
                this.timeout            = 3000;
                this.withCredentials    = true;
        }

        setInterceptors = (instance, url) => {
                // 这里的url可供你针对需要特殊处理的接口路径设置不同拦截器。
                if (url === '/user') {
                        // todo define diffrent interceptors
                }

                instance.interceptors.request.use((config) => { // 请求拦截器
                        // 在这里添加loading
                        // 配置token
                        let     authToken               = localStorage.getItem ('auth_token')
                        config.headers.Authorization    = authToken || '';
                        
                        // console.log ('interceptors::request', config)
                        return config;
                }, err => Promise.reject(err));
            
                instance.interceptors.response.use((response) => { // 响应拦截器
                        // 在这里移除loading
                        // todo: 想根据业务需要，对响应结果预先处理的，都放在这里
                        
                        let   { status,
                                data }          = response;
                        
                        let     resobj          = status === 200 ? data : {status, data: `request fail ${status}`};

                        return resobj;
                }, (err) => {
                        if (err.response) { // 响应错误码处理
                                console.log ('error::res', err.response)
                                
                                let     resobj = {}
                                // errResCodeInfos (err.response);
                                let SN = generateSN (7)
                                console.log ('error::res', SN)
                                return Promise.reject(resobj);
                        }

                        if (err.request) { // 请求超时处理
                               
                                console.log('err.request: ', err);
                                return Promise.reject(err.request);
                        }

                        if (!window.navigator.online) { // 断网处理
                                // todo: jump to offline page
                                return -1;
                        }

                        console.log('err: ', err);
                        return Promise.reject(err);
                });
        }
            
        request(options) {
                // 每次请求都会创建新的axios实例。
                let     instance        = axios.create ();
                let     config          = { // 将用户传过来的参数与公共配置合并。
                        baseURL:                this.baseURL,
                        timeout:                this.timeout,
                        withCredentials:        this.withCredentials,
                        ...options,
                };
                // 配置拦截器，支持根据不同url配置不同的拦截器。
                this.setInterceptors (instance, options?.url);
                return instance (config); // 返回axios实例的执行结果
        }

}


export default new HttpAxiosHelper ();