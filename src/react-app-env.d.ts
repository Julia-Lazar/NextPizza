import { HTMLAttributes, DetailedHTMLProps } from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'rapi-doc': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        // Add specific RapiDoc attributes here to avoid TS errors on props
        'spec-url'?: string;
        'theme'?: 'light' | 'dark';
        'render-style'?: 'view' | 'read' | 'focused';
        'schema-style'?: 'tree' | 'table';
        // Add any other attributes you use from the RapiDoc documentation
      };
    }
  }
}