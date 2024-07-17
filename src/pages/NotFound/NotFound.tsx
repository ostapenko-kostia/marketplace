import style from './styles.module.scss'

export default function NotFound() {
    return (
        <div className={style.container}>
            <h1 className={style.title}>404</h1>
            <h2 className={style.subtitle}>Not Found</h2>
            <p className={style.text}>The requested document was not found on this server. Please, check the URL</p>
        </div>
    )
}