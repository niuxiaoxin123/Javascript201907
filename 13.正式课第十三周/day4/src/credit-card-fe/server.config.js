/**
 * @file web dev server
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/13
 */
/**
 * 输出本地 ip
 * @return {string} 输出 ip 地址
 */
const ip = () => {
    const ifaces = require('os').networkInterfaces();
    const defultAddress = '127.0.0.1';
    let ip = defultAddress;

    function x(details) {
        if (ip === defultAddress && details.family === 'IPv4') {
            ip = details.address;
        }
    }

    for (let dev in ifaces) {
        ifaces[dev].forEach(x);
    }

    return ip;
};

module.exports = {
    domain: ip(),
    port: 8848,
    mockDomain: ip(),
    mockPort: 3000,
    serverConfig: {
        // rd: 'http://cp01-rdqa-dev349-liuyuzhong.epc.baidu.com:8567', // 玉忠
        // rd: 'http://yq01-sungc.epc.baidu.com:8080', // 冠超
        rd: 'http://yq01-dev-pubic.epc.baidu.com:8055' // 庄耿
        // rd: 'http://yq01-dev-pubic.epc.baidu.com:8080' // 玉龙
        // rd: 'http://xinyongka.baidu.com/' // 线上
    },
    proxyConfig() {
        const localServer = `http://localhost:${this.mockPort}`;



        // const mockServer = localServer;
        const mockServer = this.serverConfig.rd;

        return {
            '/creditserver/*': {
                target: mockServer,
                secure: false
            }
        };
    }
};


