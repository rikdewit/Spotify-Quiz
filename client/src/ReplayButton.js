import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo, faStop } from '@fortawesome/free-solid-svg-icons'

export default function ReplayButton(props) {

    function handleReplay(event) {
        props.replay(props.questionN);
    }

    function handlePause(event) {
        if (props.playing) {
            props.pause(props.questionN);
        }
    }

    return (
        <div className="ReplayContainer">
            {
                props.playing ?

                    <div>
                        < button className="ReplayButton Spotify" onClick={handlePause} >
                            <FontAwesomeIcon icon={faStop} />
                        </button >
                    </div >
                    :
                    <div>
                        < button className="ReplayButton Spotify" onClick={handleReplay} >
                            <FontAwesomeIcon icon={faRedo} />
                        </button >
                    </div>
            }
        </div>
    );
}