import { IoClose } from 'react-icons/io5'
import YouTube from 'react-youtube'
import styles from './VideoModal.module.css'

const VideoModal = (props) => {

  const options ={
    autoplay: 'true'
  }

  return (
    <div className={styles.videoModal}>
      <div className={styles.videoModalWrapper}>
         <div className={styles.modalControls}>
            <IoClose className={styles.close} onClick={props.onShowModal}/>
        </div>
        <div className={styles.youtubeContainer}>
          <YouTube className={styles.youtube} videoId={props.videoSrc} opts={options} />
        </div>
      </div>
    </div>
  )
}

export default VideoModal