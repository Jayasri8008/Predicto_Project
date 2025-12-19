// Debug logging to identify the root cause
import { execSync } from 'child_process';

console.log('=== DEBUGGING INFORMATION ===');
console.log('1. Checking for multiple Node.js processes...');

// Check using tasklist command
try {
    // Check for running Node.js processes
    const nodeProcesses = execSync('tasklist /FI "IMAGENAME eq node.exe" 2>NUL', { encoding: 'utf8' });
    console.log('Node.js processes found:');
    console.log(nodeProcesses);
    
    // Count Vite instances on common ports
    const commonPorts = ['3000', '5173', '8080', '8081'];
    for (const port of commonPorts) {
        try {
            const portCheck = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
            console.log(`Processes on port ${port}:`, portCheck);
        } catch (e) {
            console.log(`No processes found on port ${port}`);
        }
    }
} catch (error) {
    console.log('Process check error:', error.message);
}

console.log('2. Current environment info...');
console.log('Current directory:', process.cwd());
console.log('Node version:', process.version);
console.log('Platform:', process.platform);

console.log('=== END DEBUG INFO ===');