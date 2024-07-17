import { PropsWithChildren } from 'react'
import styles from './styles.module.scss'

interface Props extends PropsWithChildren {
    title: string;
}

export default function AsideRow({title, children}: Props) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            {children}
        </div>
    )
}