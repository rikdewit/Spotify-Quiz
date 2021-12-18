import firestore from './services/firebase';
import firebase from 'firebase/app';
import { useCollectionData, useDocumentData, useCollection } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';
import { timeAgo } from './services/utils'
import Table from '@material-ui/core/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { Badges } from './Badges';


export default function Highscores(props) {
    const highScoresRef = firestore.collection('Highscores');
    const query = highScoresRef.orderBy('score', 'desc').limit(10);
    const [scores] = useCollectionData(query, { idField: 'id' });
    // const [users] = useCollectionData(() => {

    //     if (scores) {
    //         console.log(scores)
    //         return firebase.firestore().doc('Users')

    //         // where(firebase.firestore.FieldPath.documentId(), "in", ids) 

    //     } else {
    //         return null
    //     }

    // });
    // const [scores, setScores] = useState();


    // useEffect(() => {
    //     getUserData();
    //     async function getUserData() {
    //         const scoresFS = await query.get();
    //         let scoreArray = [];
    //         scoresFS.forEach((doc) => {
    //             let data = doc.data();
    //             data['userId'] = doc.id;
    //             scoreArray.push(data);
    //         })
    //         setScores(scoreArray);
    //         console.log(scoreArray);

    //         if (scoreArray) {
    //             let ids = scoreArray.map((score) => {
    //                 return score.userId
    //             })

    //             const usersRef = firestore.collection("Users");
    //             let queryUsers = await usersRef.where(firebase.firestore.FieldPath.documentId(), "in", ids).get();
    //             let usersArray = [];
    //             queryUsers.forEach((doc) => {
    //                 usersArray.push(doc.data());
    //             });
    //             setUsers(usersArray);
    //         }

    //     }
    // }, []);

    // function getUserBadges(index) {
    //     let badges = [];
    //     try {
    //         badges = users[index].badges
    //     } catch {
    //         console.log("no user for that index")
    //     }
    //     return badges
    // }



    return (
        <div className="HighscoresContainer">
            <h1>Highscores</h1>

            <table className="HighscoresTable">
                <colgroup>
                    <col width="4%" />
                    <col width="70%" />
                    <col width="6%" />
                    <col width="20%" />
                </colgroup>
                <tbody>
                    {scores && scores.map((score, index) =>
                        <tr key={score.id}>
                            <td>{index + 1} </td>
                            <td className="NameRow">
                                {<Badges userId={score.id} />}
                                <p className="donatorBadge"> {score.donator ? <FontAwesomeIcon icon={faDollarSign} /> : null} </p>
                                <p className="scoreName"> {score.name} </p>
                            </td>
                            <td>{score.score}</td>
                            <td className="TimeStamp">{score.timeStamp ? timeAgo(score.timeStamp.seconds) : null}</td>
                        </tr>
                    )}


                </tbody>
            </table>

            <Table />
        </div>
    )
}