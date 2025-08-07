import { NextResponse } from 'next/server'
import { NodeSSH } from 'node-ssh'

export async function POST(request: Request) {
  const { command } = await request.json()

  if (!command) {
    return NextResponse.json({ error: 'Command is required' }, { status: 400 })
  }

  const ssh = new NodeSSH()

  try {
    // As credenciais devem vir de variáveis de ambiente
    await ssh.connect({
      host: process.env.VPS_HOST,
      username: process.env.VPS_USER,
      privateKeyPath: process.env.VPS_PRIVATE_KEY_PATH, // Ex: ~/.ssh/id_rsa
    })

    const result = await ssh.execCommand(command)

    ssh.dispose()

    return NextResponse.json({
      stdout: result.stdout,
      stderr: result.stderr,
      code: result.code,
    })
  } catch (error: any) {
    ssh.dispose()
    return NextResponse.json(
      { error: 'Failed to connect or execute command', details: error.message },
      { status: 500 },
    )
  }
}
