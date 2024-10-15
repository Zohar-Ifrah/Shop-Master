import fs from 'fs'

const logsDir = './logs'
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir)
}

// Define the time format
function getTime() {
    const now = new Date()
    return now.toUTCString()
}

function doLog(line, level = 'Debug') {
    line = `${getTime()} - ${level} - ${line}\n`
    console.log(line)
    fs.appendFileSync('./logs/backend.log', line)
}

const logger = {
    debug(line) {
        doLog(line, 'Debug')
    },
    info(line) {
        doLog(line, 'Info')
    },
    warn(line) {
        doLog(line, 'Warn')
    },
    error(line) {
        doLog(line, 'Error')
    }
}

export default logger
