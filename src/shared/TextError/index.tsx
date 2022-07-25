import * as React from 'react';

export interface ITextErrorProps {
  children: React.ReactNode
}

export function TextError (props: ITextErrorProps) {
  return (
    <p className='global-error-message'>{props.children}</p>
  )
}
