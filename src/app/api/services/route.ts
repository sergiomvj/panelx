import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // Garante que a rota seja sempre dinâmica
import { NodeSSH } from 'node-ssh'

interface Service {
  id: string
  name: string
  description: string
  image: string
  status: 'running' | 'stopped' | 'creating' | 'restarting' | 'error'
  ports: string[]
  environment: string[]
  volumes: string[]
  networks: string[]
  cpu: number
  memory: number
  restartPolicy: string
  createdAt: string
  updatedAt: string
  projectId: string | null
  projectName?: string
  healthCheck: {
    enabled: boolean
    interval: number
    timeout: number
    retries: number
    test: string[]
  }
}

// Mock projects data
const projects = [
  { id: '1', name: 'E-commerce Platform' },
  { id: '2', name: 'Data Analytics Pipeline' },
];



// Service blueprints/templates
const blueprints = [
  {
    id: 'nginx',
    name: 'Nginx Web Server',
    description: 'High-performance web server and reverse proxy',
    image: 'nginx:latest',
    category: 'web',
    ports: ['80:80'],
    environment: [
      { name: 'NGINX_HOST', default: 'example.com', description: 'Server hostname' },
      { name: 'NGINX_PORT', default: '80', description: 'Server port' }
    ],
    volumes: [
      { path: '/var/www/html', description: 'Website files directory' }
    ],
    networks: ['web'],
    healthCheck: {
      enabled: true,
      test: ['CMD', 'curl', '-f', 'http://localhost/']
    }
  },
  {
    id: 'nodejs',
    name: 'Node.js Application',
    description: 'Node.js application server',
    image: 'node:18-alpine',
    category: 'application',
    ports: ['3000:3000'],
    environment: [
      { name: 'NODE_ENV', default: 'production', description: 'Node environment' },
      { name: 'PORT', default: '3000', description: 'Application port' }
    ],
    volumes: [
      { path: '/app', description: 'Application code directory' }
    ],
    networks: ['app'],
    healthCheck: {
      enabled: true,
      test: ['CMD', 'wget', '--no-verbose', '--tries=1', '--spider', 'http://localhost:3000/health']
    }
  },
  {
    id: 'postgres',
    name: 'PostgreSQL Database',
    description: 'Relational database management system',
    image: 'postgres:15',
    category: 'database',
    ports: ['5432:5432'],
    environment: [
      { name: 'POSTGRES_DB', default: 'myapp', description: 'Database name' },
      { name: 'POSTGRES_USER', default: 'user', description: 'Database user' },
      { name: 'POSTGRES_PASSWORD', default: 'password', description: 'Database password' }
    ],
    volumes: [
      { path: '/var/lib/postgresql/data', description: 'Database data directory' }
    ],
    networks: ['db'],
    healthCheck: {
      enabled: true,
      test: ['CMD-SHELL', 'pg_isready -U ${POSTGRES_USER}']
    }
  },
  {
    id: 'redis',
    name: 'Redis Cache',
    description: 'In-memory data structure store',
    image: 'redis:7-alpine',
    category: 'cache',
    ports: ['6379:6379'],
    environment: [],
    volumes: [
      { path: '/data', description: 'Redis data directory' }
    ],
    networks: ['cache'],
    healthCheck: {
      enabled: false,
      test: []
    }
  },
  {
    id: 'mysql',
    name: 'MySQL Database',
    description: 'Popular relational database',
    image: 'mysql:8.0',
    category: 'database',
    ports: ['3306:3306'],
    environment: [
      { name: 'MYSQL_DATABASE', default: 'myapp', description: 'Database name' },
      { name: 'MYSQL_USER', default: 'user', description: 'Database user' },
      { name: 'MYSQL_PASSWORD', default: 'password', description: 'Database password' },
      { name: 'MYSQL_ROOT_PASSWORD', default: 'rootpassword', description: 'Root password' }
    ],
    volumes: [
      { path: '/var/lib/mysql', description: 'MySQL data directory' }
    ],
    networks: ['db'],
    healthCheck: {
      enabled: true,
      test: ['CMD', 'mysqladmin', 'ping', '-h', 'localhost']
    }
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    description: 'NoSQL document database',
    image: 'mongo:6',
    category: 'database',
    ports: ['27017:27017'],
    environment: [
      { name: 'MONGO_INITDB_ROOT_USERNAME', default: 'root', description: 'Root username' },
      { name: 'MONGO_INITDB_ROOT_PASSWORD', default: 'password', description: 'Root password' }
    ],
    volumes: [
      { path: '/data/db', description: 'MongoDB data directory' }
    ],
    networks: ['db'],
    healthCheck: {
      enabled: true,
      test: ['CMD', 'mongosh', '--eval', 'db.adminCommand("ping")']
    }
  }
]



// Helper function to map Docker's container state to our service status
const mapDockerStateToStatus = (state: string): Service['status'] => {
  if (state.startsWith('Up')) {
    return 'running'
  } else if (state.startsWith('Exited')) {
    return 'stopped'
  } else if (state.startsWith('Created')) {
    return 'creating'
  } else if (state.includes('restarting')) {
    return 'restarting'
  }
  return 'error'
}

export async function GET() {
  const ssh = new NodeSSH()

  try {
    await ssh.connect({
      host: process.env.VPS_HOST,
      username: process.env.VPS_USER,
      privateKeyPath: process.env.VPS_PRIVATE_KEY_PATH,
    })

    const command = `docker ps -a --format '{{json .}}'`
    const result = await ssh.execCommand(command)

    if (result.stderr) {
      throw new Error(`Docker command failed: ${result.stderr}`)
    }

    // Each line of stdout is a JSON object for a container
    const dockerServices = result.stdout
      .trim()
      .split('\n')
      .map(line => {
        try {
          return JSON.parse(line)
        } catch (e) {
          console.error('Failed to parse Docker JSON line:', line)
          return null
        }
      })
      .filter(item => item !== null)

    // Map Docker data to our Service interface
    const services: Service[] = dockerServices.map(dockerService => ({
      id: dockerService.ID,
      name: dockerService.Names,
      description: `Image: ${dockerService.Image}`,
      image: dockerService.Image,
      status: mapDockerStateToStatus(dockerService.Status),
      ports: dockerService.Ports.split(', ').filter(p => p),
      environment: [], // Requires 'docker inspect' for details
      volumes: dockerService.Mounts.split(', ').filter(m => m),
      networks: dockerService.Networks.split(', ').filter(n => n),
      cpu: 0, // Requires 'docker stats' for live data
      memory: 0, // Requires 'docker stats' for live data
      restartPolicy: '', // Requires 'docker inspect' for details
      createdAt: dockerService.CreatedAt,
      updatedAt: new Date().toISOString(), // Placeholder
      projectId: null, // Placeholder, requires labels
      projectName: undefined, // Placeholder, requires labels
      healthCheck: { enabled: false, interval: 0, timeout: 0, retries: 0, test: [] }, // Placeholder
    }))

    return NextResponse.json({
      services,
      blueprints,
      total: services.length,
    })
  } catch (error: any) {
    console.error('Error fetching services from Docker:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services', details: error.message },
      { status: 500 },
    )
  } finally {
    ssh.dispose()
  }
}

export async function POST(request: Request) {
  const ssh = new NodeSSH()
  try {
    const body = await request.json();
    const {
      name,
      image,
      ports = [],
      environment = [],
      volumes = [],
      restartPolicy = 'unless-stopped',
    } = body;

    if (!name || !image) {
      return NextResponse.json(
        { error: 'Service name and image are required' },
        { status: 400 },
      );
    }

    // Construct the docker run command
    let command = 'docker run -d';
    command += ` --name ${name}`;
    if (restartPolicy) {
      command += ` --restart ${restartPolicy}`;
    }
    ports.forEach((port: string) => {
      command += ` -p ${port}`;
    });
    volumes.forEach((volume: string) => {
      command += ` -v ${volume}`;
    });
    environment.forEach((env: string) => {
      command += ` -e "${env}"`;
    });
    command += ` ${image}`;

    // Connect and execute the command
    await ssh.connect({
      host: process.env.VPS_HOST,
      username: process.env.VPS_USER,
      privateKeyPath: process.env.VPS_PRIVATE_KEY_PATH,
    });

    const result = await ssh.execCommand(command);

    if (result.stderr) {
      // Docker often prints the container ID to stderr on success, so we check for error keywords
      if (result.stderr.toLowerCase().includes('error') || result.stderr.toLowerCase().includes('cannot')) {
         throw new Error(`Failed to create Docker container: ${result.stderr}`);
      }
    }

    return NextResponse.json(
      { message: 'Service created successfully', containerId: result.stdout || result.stderr },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service', details: error.message },
      { status: 500 },
    );
  } finally {
    ssh.dispose();
  }
}