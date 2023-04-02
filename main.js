const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const exec = require('child_process').exec;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setInterval(() => {
        exec('tasklist', function(err, stdout, stderr) {
            if (stdout.indexOf('BeamMP-Server.exe') > -1) {
                exec('wmic cpu get loadpercentage', function(err, stdout, stderr) {
                    let cpuLoad = stdout.split('\n')[1].trim();
                    exec('wmic OS get FreePhysicalMemory /Value', function(err, stdout, stderr) {
                        let freeMemory = stdout.split('=')[1].trim();
                        freeMemory = Math.round(parseInt(freeMemory) / 1024);
                        client.ws.ping;
                        client.user.setActivity(`Server Status: Online | CPU Usage: ${cpuLoad}% | RAM Usage: ${(100 - (freeMemory / 16384) * 100).toFixed(2)}% | Ping: ${client.ws.ping}ms`);
                    });
                });
            } else {
                client.user.setActivity('Server Status: Offline');
            }
        });
    }, 5000);
});

client.login('YOUR-TOKEN-GOES-HERE');
