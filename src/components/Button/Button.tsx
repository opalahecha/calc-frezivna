import type { ComponentPropsWithoutRef } from 'react';

import styles from './Button.module.scss';

interface CommonProps {
  size?: 'small' | 'medium' | 'icon';
  fullWidth?: boolean;
  uppercase?: boolean;
}

type Props = CommonProps &
  (
    | (ComponentPropsWithoutRef<'button'> & { href?: never })
    | (Omit<ComponentPropsWithoutRef<'a'>, 'type'> & {
        href: string;
        disabled?: never;
      })
  );

export const Button = ({
  children,
  className,
  size = 'medium',
  fullWidth = false,
  uppercase = false,
  ...props
}: Props) => {
  const classes = [
    styles.button,
    size !== 'medium' && styles[`button--${size}`],
    fullWidth && styles['button--full-width'],
    uppercase && styles['button--uppercase'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (props.href !== undefined) {
    return (
      <a {...props} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" {...props} className={classes}>
      {children}
    </button>
  );
};
