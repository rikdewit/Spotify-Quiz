import * as functions from "firebase-functions";
import * as admin from "firebase-admin"
admin.initializeApp();
const db = admin.firestore();

export const highScores = functions.region("europe-west1").firestore
    .document('Scores/{scoreId}')
    .onCreate(async (snapshot, context) => { 
        const newScoreData = snapshot.data();
        console.log(newScoreData.score);
        return db.runTransaction(async (t) => {
            const highScoreRef = db.collection("Highscores").orderBy("score", "asc");
            const highScoreSnap = await t.get(highScoreRef);

            const isDonator = async () => {
                const users = db.collection("Users").doc(newScoreData.id);
                let user = null;
                try {
                    user = await t.get(users);
                    console.log(user);
                } catch (e) {
                    console.log(e)
                }


                let donator = user?.data()?.donator;
                if (!donator) {
                    donator = false;
                }
                return donator;
            }

            const addScore = async () => {
                let donator = await isDonator();
                const highScores = db.collection("Highscores").doc(newScoreData.id)
                t.set(highScores, { score: newScoreData.score, name: newScoreData.name, timeStamp: newScoreData.timeStamp, donator: donator });
            }

            const removeLowScores = () => {
                const oversize = highScoreSnap.size - 10;
                console.log(highScoreSnap.size);
                let index = 0;
                highScoreSnap.forEach((score) => {
                    if (index <= oversize) {
                        t.delete(score.ref);
                    }
                    index++;
                });
            }
            

            let selfInHighScore = false;
            let beatOwnScore = true;
            highScoreSnap.forEach((score) => {
                let scoreData = score.data();
                console.log(scoreData);
                if (score.id == newScoreData.id) {
                    selfInHighScore = true;
                    if (newScoreData.score <= scoreData.score)
                        beatOwnScore = false;
                }
            });
            console.log(selfInHighScore, "selfinhighscore");
            console.log(beatOwnScore, "beatownscore")

            // If the highscorelist is not filled, put the score in if you beat your own
            if (highScoreSnap.size < 10) {
                if (!selfInHighScore) {
                    await addScore();
                } else {
                    if (beatOwnScore) {
                        await addScore();
                    }
                }
                return
            }


            let gotNewHighScore = false;
            if (beatOwnScore) {
                highScoreSnap.forEach((score) => {
                    const scoreData = score.data();
                    if (newScoreData.score > scoreData.score) {
                        gotNewHighScore = true;
                    }
                });
            }

            if (gotNewHighScore) {
                await addScore();
                if (!selfInHighScore) {
                    await removeLowScores();
                }
            }

        });
    });


export const addDonatorToNewUser = functions.region("europe-west1").firestore
    .document('Users/{userId}')
    .onCreate(async (snapshot, context) => {
        //Create a JSON document for the data 
        const uid = context.params.userId;
        let userDoc = {
            'donator': false
        }
        //Becuase we are hosting the cloud function against out firebase 
        // project, we need to now use the admin SDK
        return db.collection('Users').doc(uid)
            //we create a document the same way we do on client
            .set(userDoc, { merge: true }).then(writeResult => {
                console.log('Added default donator property to user', writeResult);

            }).catch(err => {
                console.log(err);
            });
    });

export const donatorUpdate = functions.region("europe-west1").firestore
    .document('Users/{userId}')
    .onUpdate(async (change, context) => {
        const uid = context.params.userId
        if (uid) {
            try {

                const donator = change.after.data().donator;
                const highScore = await db.collection('Highscores').doc(uid);

                return highScore?.update({ donator: donator }).then(writeResult => {
                    console.log('updated donator on highscoreslist', writeResult);

                }).catch(err => {
                    console.log(err);
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("no user found with that id")
        }

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
