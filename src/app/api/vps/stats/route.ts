import { NextResponse } from 'next/server';
import { NodeSSH } from 'node-ssh';

export const dynamic = 'force-dynamic'; // Garante que a rota seja sempre dinâmica

// Função para executar um comando e retornar seu stdout
async function executeCommand(ssh: NodeSSH, command: string): Promise<string> {
  const result = await ssh.execCommand(command);
  if (result.stderr) {
    // Ignorar erros se não forem fatais, alguns comandos escrevem em stderr por padrão
    if (result.code !== 0) {
        console.error(`Command failed: ${command}`, result.stderr);
        throw new Error(`Command failed: ${command}\n${result.stderr}`);
    }
  }
  return result.stdout.trim();
}

export async function GET() {
  const ssh = new NodeSSH();

  try {
    await ssh.connect({
      host: process.env.VPS_HOST,
      username: process.env.VPS_USER,
      privateKeyPath: process.env.VPS_PRIVATE_KEY_PATH,
    });

    // Comandos para obter as estatísticas
    const cpuCommand = `top -bn1 | grep 'Cpu(s)' | awk '{print 100 - $8}'`;
    const memCommand = `free -m | awk 'NR==2{printf "{\"total\":%s,\"used\":%s}", $2, $3}'`;
    const diskCommand = `df -h / | awk 'NR==2{printf "{\"total\":\"%s\",\"used\":\"%s\",\"percent\":\"%s\"}", $2, $3, $5}'`;

    // Executar comandos em paralelo
    const [cpuUsage, memUsage, diskUsage] = await Promise.all([
      executeCommand(ssh, cpuCommand),
      executeCommand(ssh, memCommand),
      executeCommand(ssh, diskCommand),
    ]);

    return NextResponse.json({
      cpu: parseFloat(cpuUsage) || 0,
      memory: JSON.parse(memUsage),
      disk: JSON.parse(diskUsage),
    });

  } catch (error: any) {
    console.error('Error fetching VPS stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch VPS stats', details: error.message },
      { status: 500 },
    );
  } finally {
    ssh.dispose();
  }
}
