import { IoClose } from 'react-icons/io5'
import YouTube from 'react-youtube'

const VideoModal = (props) => {

  const options ={
    autoplay: 'true'
  }

  return (
    <div className="videoModal">
        <div className="modalControls">
            <IoClose className="closeButton" onClick={props.onShowModal}/>
        </div>
        <YouTube className='youtube' videoId={props.videoSrc} opts={options} />
    </div>
  )
}

export default VideoModal