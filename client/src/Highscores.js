import firestore from './services/firebase';
import firebase from 'firebase/app';
import { useCollectionData, useDocumentData, useCollection } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';
import { timeAgo } from './services/utils'
import Table from '@material-ui/core/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { BadgesUser } from './BadgesUser';


export default function Highscores(props) {
    const highScoresRef = firestore.collection('Highscores');
    const query = highScoresRef.orderBy('score', 'desc').limit(10);
    const [scores] = useCollectionData(query, { idField: 'userId' });

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
                        <tr key={score.userId}>
                            <td>{index + 1} </td>
                            <td className="NameRow">
                                {<BadgesUser userId={score.userId} />}
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