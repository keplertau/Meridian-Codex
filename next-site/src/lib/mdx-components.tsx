import React from 'react';

/**
 * Custom heading components that add anchor IDs for TOC linking.
 * These must be used in Server Components (page routes) with MDXRemote,
 * NOT in Client Components.
 */
function textToId(children: React.ReactNode): string {
  const text = typeof children === 'string' ? children : String(children);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export const mdxHeadingComponents = {
  h2: (props: React.ComponentPropsWithoutRef<'h2'>) => {
    const id = textToId(props.children);
    return <h2 id={id} {...props} />;
  },
  h3: (props: React.ComponentPropsWithoutRef<'h3'>) => {
    const id = textToId(props.children);
    return <h3 id={id} {...props} />;
  },
};
