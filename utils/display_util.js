const { execSync } = require('child_process');

function parseWidthHeight(text) {
    const match = String(text || '').match(/(\d{3,5})\s*[xX,]\s*(\d{3,5})/);
    if (!match) {
        return null;
    }

    const width = Number(match[1]);
    const height = Number(match[2]);
    if (!Number.isFinite(width) || !Number.isFinite(height) || width < 200 || height < 200) {
        return null;
    }

    return { width, height };
}

function fromEnv() {
    const width = Number(process.env.SCREEN_WIDTH || process.env.DISPLAY_WIDTH);
    const height = Number(process.env.SCREEN_HEIGHT || process.env.DISPLAY_HEIGHT);
    if (Number.isFinite(width) && Number.isFinite(height) && width >= 200 && height >= 200) {
        return { width, height };
    }
    return null;
}

function runCommand(command, options = {}) {
    return execSync(command, {
        encoding: 'utf8',
        timeout: 8000,
        windowsHide: true,
        stdio: ['ignore', 'pipe', 'ignore'],
        ...options
    });
}

function fromWindows() {
    const script =
        "Add-Type -AssemblyName System.Windows.Forms; " +
        "$b = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds; " +
        "Write-Output ($b.Width.ToString() + 'x' + $b.Height.ToString())";
    return parseWidthHeight(runCommand(`powershell -NoProfile -Command "${script}"`));
}

function fromLinux() {
    try {
        const xdpy = runCommand("xdpyinfo | awk '/dimensions/{print $2}'", { shell: '/bin/sh' });
        const parsed = parseWidthHeight(xdpy);
        if (parsed) {
            return parsed;
        }
    } catch (_error) {
        // Fall through to xrandr when xdpyinfo is unavailable.
    }

    const xrandr = runCommand("xrandr | awk '/\\*/{print $1; exit}'", { shell: '/bin/sh' });
    return parseWidthHeight(xrandr);
}

function fromMac() {
    const output = runCommand(
        "osascript -e 'tell application \"Finder\" to get bounds of window of desktop'"
    );
    const parts = String(output).split(',').map((value) => Number(value.trim()));
    if (parts.length === 4 && parts.every(Number.isFinite)) {
        const width = parts[2] - parts[0];
        const height = parts[3] - parts[1];
        if (width >= 200 && height >= 200) {
            return { width, height };
        }
    }
    return null;
}

class DisplayUtil {
    static getScreenSize() {
        const envSize = fromEnv();
        if (envSize) {
            return envSize;
        }

        try {
            if (process.platform === 'win32') {
                return fromWindows();
            }
            if (process.platform === 'darwin') {
                return fromMac();
            }
            return fromLinux();
        } catch (error) {
            console.log(`Could not read system screen size: ${error.message}`);
            return null;
        }
    }
}

module.exports = DisplayUtil;
