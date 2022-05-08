import React from 'react';
import { RichTextEditor } from '.';
import { Extention } from './RichTextEditor';

export function RichText(allowedExtentions: Array<Extention>) {
  return function (params: { content: string; onChange: (content: string) => void }) {
    return (
      <RichTextEditor
        height='h-auto'
        value={params.content}
        onChange={params.onChange}
        uploader={() => Promise.resolve('sd')}
        allowedExtentions={allowedExtentions}
      />
    );
  };
}