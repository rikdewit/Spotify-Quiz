import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCertificate, faMedal, faCrown, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import firestore from './services/firebase';
import firebase from 'firebase/app';
import { useCollectionData, useDocumentData, useCollection } from 'react-firebase-hooks/firestore';

export function Badges(props) {

    const [user] = useDocumentData(
        firestore.doc("Users/" + props.userId)
    )

    const badgeTable = {
        'season1_1': <p className="season1_1Badge seasonBadge"><FontAwesomeIcon icon={faMedal} style={{ color: "gold" }} /></p>,
        'season1_2': <p className="season1_2Badge seasonBadge"><FontAwesomeIcon icon={faMedal} style={{ color: "#bec2cb" }} /></p>,
        'season1_3': <p className="season1_3Badge seasonBadge"><FontAwesomeIcon icon={faMedal} style={{ color: "#b08d57" }} /></p>,
        'season1': <p className="season1Badge seasonBadge"><FontAwesomeIcon icon={faCertificate} style={{ color: "lightgreen" }} /></p>,

    };

    function getBadgeIcons() {
        let badgeIcons;
        console.log(user);
        if (user) {
            if (user.badges) {
                badgeIcons = user.badges.map((badge) =>
                    badgeTable[badge]
                );
            }

        }
        return badgeIcons
    }



    return (
        <span>{getBadgeIcons()}</span>
    );
}