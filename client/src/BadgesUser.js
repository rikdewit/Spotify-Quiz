import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCertificate, faMedal, faCrown, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import firestore from './services/firebase';
import firebase from 'firebase/app';
import { useCollectionData, useDocumentData, useCollection } from 'react-firebase-hooks/firestore';
import { BadgesIcons } from './BadgesIcons';

export function BadgesUser(props) {

    const [user] = useDocumentData(
        firestore.doc("Users/" + props.userId)
    )

    function getBadges() {
        return user ? user.badges : null;
    }

    return (
        <BadgesIcons badgeNames={getBadges()} />
    );
}