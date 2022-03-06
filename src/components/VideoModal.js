import { IoClose } from 'react-icons/io5'
import YouTube from 'react-youtube'
import styles from './VideoModal.module.css'

const VideoModal = (props) => {

  const options ={
    autoplay: 'true'
  }

  return (
    <div className={styles.videoModal}>
        <div className={styles.modalControls}>
            <IoClose className="closeButton" onClick={props.onShowModal}/>
        </div>
        <YouTube className={styles.youtube} videoId={props.videoSrc} opts={options} />
    </div>
  )
}

export default VideoModal