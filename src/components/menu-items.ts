import {
  LayoutDashboard, 
  FolderOpen, 
  Settings, 
  Activity, 
  Globe, 
  Terminal, 
  Database
} from 'lucide-react';

export const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'projects', icon: FolderOpen, label: 'Projects' },
  { id: 'services', icon: Activity, label: 'Services' },
  { id: 'terminal', icon: Terminal, label: 'Terminal' },
  { id: 'logs', icon: Database, label: 'Logs' },
  { id: 'domains', icon: Globe, label: 'Domains' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];
