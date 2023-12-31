import React from 'react';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import { colors, fonts } from '../../constants/variables';
import Facebook from './Facebook';
import Instagram from './Instagram';
import Logo from '../Logo';
import Form from './Form';
import userContext from '../../contexts/userContext';
import { useContext } from 'react';
import {
  RATING_ROUTE,
  ABOUT_ROUTE,
  COURSES_ROUTE,
  QUIZZES_ROUTE,
  IQTests_ROUTE,
} from '../../constants/routes';
import { useTranslation } from 'react-i18next';

const Footer = (props) => {
  const classes = useStyles();
  const classesForMediaQueries = mediaQueries();
  const user = useContext(userContext);
  const { t } = useTranslation();

  return (
    <footer
      className={`${classes.footer} ${classesForMediaQueries.footer}`}
      style={{
        position: props.positionForLoading,
        bottom: props.bottomPositionForLoading,
      }}>
      <div
        className={`${classes.containerOfLogo} ${classesForMediaQueries.containerOfLogo}`}>
        <Logo />
      </div>
      {user && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: '10px',
            marginTop: 35,
            marginBottom: 35,
          }}>
          <div className={classes.wrapperOfLinkAndSubLinks}>
            <NavLink
              to={ABOUT_ROUTE}
              className={`${classes.navLinkStyle} ${classesForMediaQueries.navLinkStyle}`}>
              {t('aboutus')}
            </NavLink>
            <NavLink className={classes.subLinkOfNavLink}>
              {t('whatIsTestsSection')}
            </NavLink>
            <NavLink className={classes.subLinkOfNavLink}>
              {t('whatIsCoursesSection')}
            </NavLink>
            <NavLink className={classes.subLinkOfNavLink}>
              {t('whatIsRatingSection')}
            </NavLink>
            <NavLink className={classes.subLinkOfNavLink}>
              {t('contactUs')}
            </NavLink>
          </div>

          <div className={classes.wrapperOfLinkAndSubLinks}>
            <NavLink
              to={COURSES_ROUTE}
              className={`${classes.navLinkStyle} ${classesForMediaQueries.navLinkStyle}`}>
              {t('courses')}
            </NavLink>
            <NavLink className={classes.subLinkOfNavLink}>
              {t('mathematics')}
            </NavLink>
            <NavLink className={classes.subLinkOfNavLink}>
              {t('programming')}
            </NavLink>
            <NavLink className={classes.subLinkOfNavLink}>
              {t('english')}
            </NavLink>
            <NavLink className={classes.subLinkOfNavLink}>
              {t('graphicDesign')}
            </NavLink>
            <NavLink className={classes.subLinkOfNavLink}>{t('UX/UI')}</NavLink>
          </div>

          <div className={classes.wrapperOfLinkAndSubLinks}>
            <NavLink
              to={QUIZZES_ROUTE}
              className={`${classes.navLinkStyle} ${classesForMediaQueries.navLinkStyle}`}>
              {t('tests')}
            </NavLink>
            <NavLink className={classes.subLinkOfNavLink}>
              {t('mathematics')}
            </NavLink>
            <NavLink className={classes.subLinkOfNavLink}>
              {t('programming')}
            </NavLink>
            <NavLink className={classes.subLinkOfNavLink}>
              {t('english')}
            </NavLink>
            <NavLink className={classes.subLinkOfNavLink}>
              {t('graphicDesign')}
            </NavLink>
            <NavLink className={classes.subLinkOfNavLink}>{t('UX/UI')}</NavLink>
          </div>
          <div className={classes.wrapperOfLinkAndSubLinks}>
            <NavLink
              to={RATING_ROUTE}
              className={`${classes.navLinkStyle} ${classesForMediaQueries.navLinkStyle}`}>
              {t('rating')}
            </NavLink>

            <NavLink
              to={IQTests_ROUTE}
              className={`${classes.navLinkStyle} ${classesForMediaQueries.navLinkStyle}`}>
              {t('IQTests')}
            </NavLink>
          </div>
        </div>
      )}

      {!user && (
        <div
          className={`${classes.containerOfSubscribeForm} ${classesForMediaQueries.containerOfSubscribeForm}`}>
          <p
            className={`${classes.typografyStyle} ${classesForMediaQueries.typografyStyle}`}>
            {t('footerFormHeader')}
          </p>
          <Form />
        </div>
      )}

      <div
        className={`${classes.containerOfIconButtonsAndTypografy} ${classesForMediaQueries.containerOfIconButtonsAndTypografy}`}>
        <p
          className={`${classes.typografyStyle} ${classesForMediaQueries.typografyStyle}`}>
          {t('footerSocialMediaLinksHeader')}
        </p>
        <div className={classes.containerOfIconButtons}>
          <IconButton
            component={Link}
            to='#'
            aria-label='Instagram'
            color='inherit'>
            <Instagram
              className={`${classes.iconStyle} ${classesForMediaQueries.iconStyle}`}
            />
          </IconButton>
          <IconButton
            component={Link}
            to='https://www.facebook.com/profile.php?id=100068397000889'
            aria-label='Facebook'
            color='inherit'>
            <Facebook
              className={`${classes.iconStyle} ${classesForMediaQueries.iconStyle}`}
            />
          </IconButton>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
/*--------------------------------------------Styles--------------------------------------------*/
const useStyles = makeStyles({
  footer: {
    marginTop: 'auto',
    backgroundColor: colors.darkGreen,
    display: 'flex',
    justifyContent: 'space-around',
    // position: 'fixed',
    // bottom: 0,
  },
  containerOfLogo: {
    // width: 250,
    // height: 178,
    marginLeft: 100,
    marginTop: 50,
  },
  typografyStyle: {
    color: colors.yellow,
    textAlign: 'center',
    fontSize: 20,
  },
  containerOfSubscribeForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
  },
  containerOfIconButtonsAndTypografy: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerOfIconButtons: {
    display: 'flex',
  },
  iconStyle: {
    width: 40,
  },
  navLinkStyle: {
    color: colors.white,
    fontFamily: fonts.armenian,
    textDecoration: 'none',
    fontStyle: 'normal',
    fontSize: 20,
    margin: 5,
    marginBottom: 15,
    '&:focus': {
      color: colors.yellow,
    },
  },
  wrapperOfLinkAndSubLinks: {
    display: 'flex',
    flexDirection: 'column',
    margin: 8,
  },
  subLinkOfNavLink: {
    color: colors.white,
    fontSize: 12,
    margin: 5,
    textDecoration: 'none',
  },
});

/*------------------------------------------------media quiries------------------------------------------------*/
const mediaQueries = makeStyles({
  '@media (max-width: 600px)': {
    footer: {
      flexWrap: 'wrap',
    },
    containerOfLogo: {
      width: 200,
      height: 158,
      marginLeft: 80,
      marginTop: 20,
    },
    containerOfSubscribeForm: {
      marginRight: 20,
      marginTop: 10,
    },
    containerOfIconButtonsAndTypografy: {
      marginRight: 20,
    },
    typografyStyle: {
      fontSize: 15,
    },
    iconStyle: {
      width: 15,
    },
  },
  '@media (min-width:601px) and (max-width:992px)': {
    footer: {
      flexWrap: 'wrap',
    },
    containerOfLogo: {
      width: 250,
      height: 178,
      marginLeft: 100,
      marginTop: 16,
    },
    containerOfSubscribeForm: {
      marginRight: 25,
    },
    containerOfIconButtonsAndTypografy: {
      marginRight: 25,
    },
    typografyStyle: {
      fontSize: 15,
      marginTop: 50,
    },
    iconStyle: {
      width: 25,
    },
  },
  '@media (min-width:993px) and (max-width:1200px)': {
    containerOfSubscribeForm: {
      marginRight: 30,
    },
    containerOfIconButtonsAndTypografy: {
      marginRight: 30,
    },
    typografyStyle: {
      fontSize: 17,
    },
    iconStyle: {
      width: 35,
    },
  },
});
