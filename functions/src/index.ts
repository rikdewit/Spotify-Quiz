import * as functions from "firebase-functions";
import * as admin from "firebase-admin"
admin.initializeApp();
const db = admin.firestore();

export const highScores = functions.firestore
.document('Scores/{scoreId}')
.onCreate(async (snapshot, context) =>{

    const newScoreData = snapshot.data();
    console.log(newScoreData.score);
    return db.runTransaction(async (t) => { 
        const highScoreRef = db.collection("Highscores").orderBy("score", "asc");
        const highScoreSnap = await t.get(highScoreRef);


        const addScore = () =>{
            const highScores = db.collection("Highscores").doc()
            t.set(highScores, {score:newScoreData.score, id:newScoreData.id, name:newScoreData.name, timeStamp:newScoreData.timeStamp});
        }

        const removeOwnScore = () => {
            highScoreSnap.forEach((score)=>{
                let scoreData = score.data();
                if (scoreData.id == newScoreData.id){
                    t.delete(score.ref);
                }
            });
        }

        const removeLowScores = () =>{
            const oversize = highScoreSnap.size - 10;
            console.log(highScoreSnap.size);
            let index = 0;
            highScoreSnap.forEach((score)=>{
                if(index <= oversize){
                    t.delete(score.ref);
                }
                index ++;
            });
        }

        let selfInHighScore = false;
        let beatOwnScore = true;
        highScoreSnap.forEach((score) =>{
            let scoreData = score.data();
            if(scoreData.id == newScoreData.id){
                selfInHighScore = true;
                if(newScoreData.score <= scoreData.score)
                    beatOwnScore = false;
            }
        });
        console.log(selfInHighScore, "selfinhighscore");
        console.log(beatOwnScore, "beatownscore")

        // If the highscorelist is not filled, put the score in if you beat your own
        if(highScoreSnap.size < 10 ){
            if(!selfInHighScore){
                addScore();
            }else{
                if(beatOwnScore){
                    addScore();
                    removeOwnScore();
                }
            }
            return
        }


        let gotNewHighScore = false;
        if(beatOwnScore){
            highScoreSnap.forEach((score)=>{
                const scoreData = score.data();
                if(newScoreData.score > scoreData.score){
                    gotNewHighScore = true;
                }
            });
        }

        if(gotNewHighScore){
            addScore();
            if(selfInHighScore){
                removeOwnScore();
            }else{
                removeLowScores();
            }
        }

    });
});

// let srcCollectionName = "Scores";
// let destCollectionName = "Highscores";
// copyCollection();

// async function copyCollection() {
//     const documents = await db.collection(srcCollectionName).get();
//     let writeBatch = admin.firestore().batch();
//     const destCollection = db.collection(destCollectionName);
//     let i = 0;
//     for (const doc of documents.docs) {
//         writeBatch.set(destCollection.doc(doc.id), doc.data());
//         i++;
//         if (i > 400) {  // write batch only allows maximum 500 writes per batch
//             i = 0;
//             console.log('Intermediate committing of batch operation');
//             await writeBatch.commit();
//             writeBatch = admin.firestore().batch();
//         }
//     }
//     if (i > 0) {
//         console.log('Firebase batch operation completed. Doing final committing of batch operation.');
//         await writeBatch.commit();
//     } else {
//         console.log('Firebase batch operation completed.');
//     }
// }
