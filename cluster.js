const cluster = require('cluster');
const os = require('os');


if (cluster.isMaster) {
    const cores = os.cpus().length;
    console.log('Master started...');
    for (let i = 0; i < cores - 1; i++) {
        const worker = cluster.fork();
        worker.on('exit', () => {
            cluster.fork()
        })
    }
} else {
    require('./index')
};