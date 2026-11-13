import { spawn } from 'node:child_process';
const args=process.argv.slice(2);
const portIndex=args.indexOf('--port');
const port=portIndex>=0?args[portIndex+1]:(process.env.PORT||'3000');
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname','0.0.0.0','--port',port],{stdio:'inherit'});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.kill(signal));
server.on('exit',code=>process.exit(code??0));
