import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCertificate, faMedal, faCrown, faDollarSign } from '@fortawesome/free-solid-svg-icons'

export function Badges(props) {

    const badgeTable = {
        'season1_1': <p className="season1_1Badge seasonBadge"><FontAwesomeIcon icon={faMedal} style={{ color: "gold" }} /></p>,
        'season1_2': <p className="season1_2Badge seasonBadge"><FontAwesomeIcon icon={faMedal} style={{ color: "#bec2cb" }} /></p>,
        'season1_3': <p className="season1_3Badge seasonBadge"><FontAwesomeIcon icon={faMedal} style={{ color: "#b08d57" }} /></p>,
        'season1': <p className="season1Badge seasonBadge"><FontAwesomeIcon icon={faCertificate} style={{ color: "lightgreen" }} /></p>,

    };

    let badges;
    if (props.badges) {
        badges = props.badges.map((badge) =>
            badgeTable[badge]
        );
    }


    return (
        <span>{badges}</span>
    );
}