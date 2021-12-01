import { useState, useContext, useEffect } from 'react'
import { UserContext } from './App'

import firestore from './services/firebase';
import firebase from 'firebase/app';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function FeedbackForm(props) {
    const { user, accessToken, refreshToken } = useContext(UserContext);
    const [opened, setOpened] = useState(false);
    const [name, setName] = useState(user.display_name);
    const [feedback, setFeedback] = useState("");
    const [feedbackError, setFeedbackError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [emailSubscribed, setEmailSubscribed] = useState(true);
    const [feedbackGiven, setFeedbackGiven] = useState(false);


    function handleChangeName(event) {
        setNameError(false);
        setName(event.target.value);
    }

    function handleChangeFeedback(event) {
        setFeedbackError(false);
        setFeedback(event.target.value);
    }

    function handleOpen(event) {
        setOpened(true);
    }

    function handleClose(event) {
        if (feedbackGiven) {
            setTimeout(() => setFeedbackGiven(false), 200);
            setFeedback("");
        }
        setOpened(false);
    }

    function handleEmailSubscribeChange(event) {
        setEmailSubscribed(event.target.checked);
    }

    async function postFeedback(event) {

        if (feedback && name) {
            const feedbackRef = firestore.collection('Feedback');
            await feedbackRef.add({
                id: user.id,
                email: user.email,
                name: name,
                feedback: feedback,
                emailSubscribed: emailSubscribed,
                timeStamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setFeedbackGiven(true);

        } else {
            if (!feedback) {
                setFeedbackError(true);
            }
            if (!name) {
                console.log(name)
                setNameError(true);
            }
        }
    }

    return (
        <div>
            <button className="Spotify SecondaryButton" onClick={handleOpen}>Geef feedback</button>
            <Dialog open={opened} onClose={handleClose}>

                {!feedbackGiven ?
                    <div>

                        <DialogTitle >Geef feedback</DialogTitle>

                        <DialogContent>
                            <DialogContentText>
                                Ik werk hard om nieuwe features toe te voegen en de ervaring te verbeteren.
                                <br />
                                Wat is er goed en wat kan er nog beter?

                            </DialogContentText>
                            <form onSubmit={postFeedback} >
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Naam"
                                    defaultValue={name}
                                    variant="outlined"
                                    onChange={handleChangeName}
                                    error={nameError}
                                />

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Feedback"
                                    multiline
                                    rows={4}
                                    rowsMax={10}
                                    value={feedback}
                                    onChange={handleChangeFeedback}
                                    variant="outlined"
                                    error={feedbackError}
                                />

                                <FormControlLabel control={
                                    <CheckBox
                                        checked={emailSubscribed}
                                        onChange={handleEmailSubscribeChange}
                                        name="emailCheckbox"
                                        color="primary"
                                    />
                                }
                                    label="Hou mij op de hoogte van nieuwe features via email"
                                />

                            </form >
                            <div className="ModalButtonContainer">
                                <button className="Spotify SecondaryButton" onClick={handleClose}>sluiten</button>
                                <button className="Spotify" onClick={postFeedback}>Verstuur</button>
                            </div>
                        </DialogContent>
                    </div>
                    :
                    <div>
                        <DialogContent>
                            <h2 className="FeedbackThanks">Bedankt voor je feedback!</h2>
                            <div className="ModalButtonContainer">
                                < button className="Spotify SecondaryButton" onClick={handleClose}>sluit</button>
                            </div>
                        </DialogContent>
                    </div>}
            </Dialog>
        </div >
    );
}