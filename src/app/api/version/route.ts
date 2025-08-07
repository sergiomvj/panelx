import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import util from 'util';

// Promisify exec for async/await usage
const execPromise = util.promisify(exec);

export async function POST(request: Request) {
  try {
    const { action } = await request.json();

    if (action !== 'upgrade' && action !== 'rollback') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Scripts are in the parent directory of the Next.js app
    const scriptsDir = path.resolve(process.cwd(), '..');
    const scriptPath = path.join(scriptsDir, action === 'upgrade' ? 'upgrade.sh' : 'rollback.sh');

    console.log(`Executing script: ${scriptPath}`);

    const { stdout, stderr } = await execPromise(`sh ${scriptPath}`);

    if (stderr) {
      console.error(`Script error: ${stderr}`);
      return NextResponse.json({ error: 'Script execution failed', details: stderr }, { status: 500 });
    }

    console.log(`Script output: ${stdout}`);
    return NextResponse.json({ message: `Action '${action}' executed successfully`, details: stdout });

  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}
