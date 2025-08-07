'use client'

import React, { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

const XtermTerminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let term: Terminal;
    if (terminalRef.current) {
      term = new Terminal({
        cursorBlink: true,
        convertEol: true,
        fontFamily: `"Cascadia Code", Menlo, Monaco, "Courier New", monospace`,
        fontSize: 14,
        theme: {
          background: '#1e1e1e',
          foreground: '#d4d4d4',
          cursor: '#d4d4d4',
        },
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);

      term.open(terminalRef.current);

      // Define a stable function for the resize handler to prevent memory leaks.
      const handleResize = () => {
        fitAddon.fit();
      };

      // Delay the initial fit to ensure the container has been rendered.
      const fitTimeout = setTimeout(() => handleResize(), 1);

      window.addEventListener('resize', handleResize);

      term.writeln('Welcome to FacePanel Terminal!');
      term.writeln('Connecting to container...');
      term.writeln('');
      term.write('$ ');

      // Cleanup function
      return () => {
        clearTimeout(fitTimeout);
        window.removeEventListener('resize', handleResize);
        term.dispose();
      };
    }
  }, []);

  return <div ref={terminalRef} className="w-full h-full" />
}

export default XtermTerminal
