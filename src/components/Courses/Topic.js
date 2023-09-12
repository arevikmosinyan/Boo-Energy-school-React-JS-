import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { divisions } from '../Categories';
import { Button, makeStyles } from '@material-ui/core';
import { colors } from '../../constants/variables';
import { useState } from 'react';
import { writeUserData } from '../../requests/firebase';
import userDataContext from '../../contexts/userDataContext';
import { useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import loadingContext from '../../contexts/dataLoadingContext';
import Loading from '../Loading';
import userContext from '../../contexts/userContext';

const Topic = () => {
  const classes = useStyles();
  const location = useLocation();
  const userData = useContext(userDataContext);
  const user = useContext(userContext);
  const loading = useContext(loadingContext);
  // const [alreadyReadClassesIds,setAlreadyReadClassesIds]=useState(userData?.alreadyReadClassesIds)
  const [alreadyRead, setAlreadyRead] = useState(false);
  const [scoreForReading, setScoreForReading] = useState(
    userData?.scoreForReading || 0,
  );

  const [openTheDialog, setOpenTheDialog] = useState(false);
  const { selectedClassId } = location.state || {};
  let selectedClass = null;

  console.log(loading);

  /*-------------------------------------setting new score to real-time database while clicking----------------*/

  function submitGainedScoresForReading() {
    for (let singleDivision of divisions) {
      for (let singleClass of singleDivision.classes) {
        if (singleClass.id === selectedClassId) {
          if (!userData?.alreadyReadClassesIds?.includes(singleClass.id)) {
            // setAlreadyReadClassesIds([...userData.alreadyReadClassesIds,singleClass.id]);//chi ashxatum ays tarberakum
            writeUserData({
              ...userData,
              scoreForReading,
              // alreadyReadClassesIds,
              alreadyReadClassesIds: [
                ...userData?.alreadyReadClassesIds,
                singleClass.id,
              ],
            });
          } else {
            setAlreadyRead(true);
            setOpenTheDialog(true);

            return;
          }

          break;
        }
      }

      if (selectedClass) {
        break;
      }
    }
  }

  /*---------------------------------------------------adding score while scrolling-----------------*/

  useEffect(() => {
    function addingScoreWhileScrolling() {
      const scrollHeight = document.documentElement.scrollHeight; // ամբողջ էջն է, scroll-ի ենթակա ամբողջ մասը
      const scrollYOffset = window.pageYOffset; //scroll արած վերև գնացած, չերևացող մասը
      const windowHeight = window.innerHeight; // user-ին տեսանելի հատվածը

      for (let singleDivision of divisions) {
        for (let singleClass of singleDivision.classes) {
          if (singleClass.id === selectedClassId) {
            if (!singleClass.isRead) {
              if (windowHeight + scrollYOffset >= scrollHeight) {
                setScoreForReading(scoreForReading + 1);
              }
            }
          }
        }

        if (selectedClass) {
          break;
        }
      }
    }

    window.addEventListener('scroll', addingScoreWhileScrolling);

    return () =>
      window.removeEventListener('scroll', addingScoreWhileScrolling);
  }, []);

  /*--------------------------------by this loop we decide which class was selected-------------------------*/
  for (let singleDivision of divisions) {
    for (let singleClass of singleDivision.classes) {
      if (singleClass.id === selectedClassId) {
        selectedClass = singleClass;
        break;
      }
    }

    if (selectedClass) {
      break;
    }
  }

  /*-------------------------------------------------------------------------------------------------------------*/
  console.log(scoreForReading); //stex der undefined e, chi hascnum get ani, dra hama8 es togh@ ||ov em tvel
  // <div className={classes.scoreShowDiv}>
  //{scoreForReading || userData?.scoreForReading}

  // </div>
  console.log(userData?.scoreForReading);
  return (
    <div
      className={classes.container}
      style={{ backgroundColor: alreadyRead ? 'red' : 'blue' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={classes.scoreShowDiv}>
            {/* {scoreForReading || userData?.scoreForReading} */}
            {scoreForReading}
          </div>

          <p className={classes.paragraph}>
            {selectedClass?.singleClassContent}
          </p>

          <form className={classes.wrapperOfButtonSignUp}>
            <Button
              type={openTheDialog ? 'button' : 'submit'}
              variant='outlined'
              className={classes.submitButtonOfGainedScoresForReading}
              onClick={submitGainedScoresForReading}>
              Պահպանել հավաքած միավորները
            </Button>
            {openTheDialog ? (
              <Dialog open={true} onClose={() => setOpenTheDialog(false)}>
                <DialogContent>
                  <DialogContentText>
                    Դուք արդեն կարդացել եք այս դասը և վաստակել համապատասխան
                    միավոր։ Կրկնակի ընթերցանությունից լրացուցիչ միավորներ չեն
                    ավելանում:
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setOpenTheDialog(false)}
                    color='primary'
                    autoFocus>
                    Լավ
                  </Button>
                </DialogActions>
              </Dialog>
            ) : null}
          </form>
        </>
      )}
    </div>
  );
};

export default Topic;
/*----------------------------------------------Styles--------------------------------------------------*/
const useStyles = makeStyles({
  scoreShowDiv: {
    position: 'fixed',
    padding: 15,
    backgroundColor: colors.darkGreen,
    color: colors.white,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  paragraph: {
    border: `3px solid ${colors.yellow}`,
    borderRadius: 15,
    padding: 20,
    margin: '50px 130px',
  },
  wrapperOfButtonSignUp: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  submitButtonOfGainedScoresForReading: {
    color: colors.white,
    backgroundColor: colors.yellow,
    borderRadius: 10,
    marginBottom: 30,
    '&:hover': {
      backgroundColor: colors.lightGreen,
    },
  },
});