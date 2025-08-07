import type { LucideProps } from 'lucide-react';

declare module 'lucide-react' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface LucideProps extends React.SVGAttributes<SVGSVGElement> {}
}
