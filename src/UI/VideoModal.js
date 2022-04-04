import { IoClose } from 'react-icons/io5'
import YouTube from 'react-youtube'
import styles from './VideoModal.module.css'

const VideoModal = (props) => {

  const opts = {
    autoplay: 'true',
  }

  return (
    <div className={styles.videoModal}>
      <div className={styles.videoModalWrapper}>
          <YouTube className={styles.youtube} videoId={props.videoSrc} opts={opts} />
          <IoClose className={styles.close} onClick={props.onShowModal}/>
      </div>
    </div>
  )
}

export default VideoModal