import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer>
        <div className="wrapper">
            <p>Coded by <a className={styles.footerLink} href='https://justinvien.dev' target='blank'>Justin Vien</a></p>
        </div>
    </footer>
  )
}

export default Footer