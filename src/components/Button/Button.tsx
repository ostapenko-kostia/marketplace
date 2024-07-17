import { PropsWithChildren } from 'react';
import styles from './styles.module.scss'

export default function Button({children, ...props}: PropsWithChildren) {
    return (
        <button {...props} className={styles.button}>{children}</button>
    )
}