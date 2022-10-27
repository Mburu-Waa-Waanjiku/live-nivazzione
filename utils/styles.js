import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: '#222 !important',
    position: 'fixed !important',
    top: 0,
    '& a': {
      color: '#ffffff !important',
      marginLeft: '10px !important',
      marginTop: '2px !important',
    }, 
  },
  brand: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
       display: 'flex !important',
       fontWeight: 'bold !important',
       fontSize: '1.6rem !important',}
  },
  cartnlg: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',}
  },
  cartnlgo: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      paddingTop:4}
  },
  cartnsch: {
      display: 'flex',
      paddingTop:8,
  },
  carton: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      paddingTop: '4px',}
  },
  smbrand: {
    fontWeight: 'bold !important',
    position: 'absolute !important',
    fontSize: '1.5rem !important',
    transform: 'translate(-20%, -50%) !important',
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',}
  },
  smseach: {
    margin: '5px 0',
    height: 35,
    display: 'flex',
    width: '100%',
    backgroundColor: 'white',
    alignItems:'center',
    borderBottom: '1px solid grey',
    borderTop: '1px solid grey',
    zIndex: 10,
    justifyContent:'space-between',
    position: 'sticky',
    transition: 'top 0.6s',
    [theme.breakpoints.up('sm')]: {
      display: 'none',}
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  transparentBackgroud: {
    backgroundColor: 'transparent',
  },
  error: {
    color: '#f04040',
  },
  fullWidth: {
    width: '100%',
  },
  reviewBody: {
    padding: 30,
    backgroundColor: '#f1f5f9',
  },
  reviewAllBody: {
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 1, 1)',
    transitionDuration: '2000ms',
    transitionDelay: '75ms',
    width: '100vw',
    backgroundColor: 'white',
    top: 0,
    left: 0,
    zIndex: 1300,
    position: 'fixed',
    height: '100vh',
  },
  reviewTopTab: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bolder',
    borderBottom: '2px solid #ececec',
  },
  addRev: {
    position: 'fixed',
    bottom: 0,
  },
  reviewForm: {
    maxWidth: 800,
    width: '100%',
  },
  reviewItem: {
    marginRight: '1rem',
    borderRight: '1px #808080 solid',
    paddingRight: '1rem',
  },
  reviewSeeMore: {
    textAlign: 'right',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      padding: '10px',
      textAlign: 'right',
      fontWeight: 'bolder',
      }
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  menuButton: { padding: '0 !important' },
  mt1: { marginTop: '1rem' },
  // search
  searchSection: {
      zIndex: 15,
      display: 'flex',
      flexGrow:1,
      justifyContent:'center',
  },
  searchForm: {
    border: '1px solid #6a6b6c',
    backgroundColor: 'white',
    overflow: 'hidden',
    height: 25,

  },
  searchInput: {
    paddingLeft: 10,
    color: 'white',
    '& ::placeholder': {
      color: 'white',
    },
  },
  inpttxt: {
    padding: '0 7px',
  },
  iconButton: {
    backgroundColor: '#222 !important',
    padding: '2px 5px !important',
    borderRadius: ' 0 !important',
    '& span': {
      color: 'white !important',
    },
  },
  sort: {
    marginRight: 5,
  },
  burgainButton: {
    width:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding:4,
    borderRadius:'5px',
    textAlign: 'center',
    backgroundColor: 'white',
    color: 'green',   
    fontSize:20,
  },
  mpesa: {
    width:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding:4,
    borderRadius:'5px',
    textAlign: 'center',
    backgroundColor: '#70b04a',
    color: 'white',   
    fontSize:20,

  }, 
  yphoto: {
    display: 'flex',
    padding: 20,
    display: 'none',
    '& ::-webkit-scrollbar': {
      height: 0,
    },
  },
  header: {
    width:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    lineHeight:'1.25rem',
    transform: 'translate(0%, 50%)',
    padding: '0.75',
    paddingRight: '10vh', 
  }, 
  next: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  arrow: {
    width:'100% !important',
    alignItems:'center ',
    justifyContent:'center ',
    padding:'0.75px !important',
    fontSize:'40px !important',
    transform: 'translate(0%, 40%)',
  },
  text: { textAlign: 'center' },
  price: { fontSize: 14, fontWeight: 'bold'},
  prevprice: { fontSize: 14, 
              fontWeight: 'bold',
              color: 'red'
            },  
  fullContainer: { height: '100vh',
                   '& ::-webkit-scrollbar': {
                       
                    },
                    },
  mapInputBox: {
    position: 'absolute',
    display: 'flex',
    left: 0,
    right: 0,
    margin: '10px auto',
    width: 300,
    height: 40,
    '& input': {
      width: 250,
    },
  },
  newBanner: {
    display: 'flex',
    gridTemplateColumns: '1fr 1fr',
    gap: 15,
  },
  categGall: {
    marginTop: '10px',
    color: 'black',
    backgroundColor: 'white',
    height: 70,
  },
  categGallAbs: {
    position: 'absolute',
  },
  hmStyle: {
    display:'none',
    height: 45,
    backgroundColor: 'white',
  },
  categ: {
    display:'grid !important',
    gap: 10,
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    [theme.breakpoints.up('sm')]: {
       gap: 15,
    },
    [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    },
  },

  categRut: {
    height: 'auto',
  },
  catehgallbty: {
    paddingTop: 10,
    height: 65,
  },
  ndicatenone: {
    display: 'none',
  }, 
  ndicateflex: {
    display: 'inline-flex',
  },
  ndicatetrue: {
    display: "block",
  },
  ndicateArrow: {
    transform: 'translate(275%, 0%) !important',    
    backgroundColor: 'transparent !important',
    width: '1px !important',
    height: 4,
    borderLeft: '7px solid transparent',
    borderRight: '7px solid transparent',
    borderTop: '10px solid rgb(186, 202, 188)',
  },
  ndicateThick: {
    height: '3px !important',
  },
  wrapperCateg: {
    justifyContent: 'space-evenly !important',
    backgroundColor: 'white !important', 
    display: 'flex !important',
    flexFlow: 'column !important',
    [theme.breakpoints.up('sm')]: {
      flexFlow: 'row !important',
      backgroundColor : '#f1f5f9 !important',
    },
    
  },
  roundedTabShadow: {
    backgroundColor: 'white !important',
    boxShadow: '0 2px 5px 1px rgb(64 60 67 / 50%)',
    borderRadius: '80px !important',
    minHeight: '40px !important',
    minWidth: '40px !important'
  },
  roundedTab: {
    borderRadius: '80px !important',
    padding: '0 20px',
  },
  categMain: {
    flexGrow: '1 !important',
    overflow: 'hidden !important',
    cursor: 'pointer !important',
    backgroundColor: 'white !important',
    display: 'grid !important',
    gridTemplateColumns: '1fr !important',
    gridTemplateRows: '1fr !important',
    placeItems: 'center !important',
    [theme.breakpoints.up('sm')]: {
      display: 'flex !important',
      backgroundColor: '#f1f5f9 !important',
    },
  },
  categPic: {
    padding: 0,
    backgroundColor: '#f1f5f9',
    borderRadius: 50,
    width: 60,
    height: 60,
    overflow: 'hidden',
    marginRight: '0 !important',
    [theme.breakpoints.up('sm')]: {
      justifyItems: 'center',
    },
    '& span': {
      padding: '8px !important',
    },
  },
  categName: {
    flexGrow: 1,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 1,
  },
  newpost: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    backgroundColor: '#ffdf00',
    color: 'black',
    fontWeight: 'bolder',
    width: 18,
    height: 25,
    padding: '8px 4px 4px 4px',
    fontSize: 8,
  },
  newpostb: {
    position: 'absolute',
    zIndex: 2,
    marginTop: 10,
    backgroundColor: '#00C949',
    color: 'white',
    width: 26,
    lineHeight: '5px',
    height: 20,
    padding: '8px 4px 4px 4px',
    fontSize: 8,
  },
  globalgrid : {
    display: 'grid !important',
    gridTemplateColumns: '1fr 1fr !important',
    gap: 10,
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr 1fr !important',
          },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr !important',
          },
  },
  padTab: {
    padding: '0 !important',
  },
  badge: {
    color: 'white',
    border: '3px solid #222',
    width: '4px',
    fontSize: '10px',
    backgroundColor: '#30d04a',
  },
  badgeLg: {
    color: 'white',
    border: '2px solid white',
    width: '4px',
    fontSize: '10px',
    backgroundColor: '#30d04a',
  },
  sScreen: {
    margin: '5px 10px',
    padding: '1px 10px',
    borderRadius: '5px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  sfScreen: {
    margin: '5px 10px',
    padding: '1px 10px',
    borderRadius: '5px',
    backgroundColor: '#e7e5e4',
    position: 'absolute',
    zIndex: '1300',
    top: '60px',
    cursor: 'pointer',
  },
  ftrStatusx: {
    display: 'initial',
    padding: '0px 6px',
    borderRadius: '5px',
    float: 'right',
    marginTop: '3px',
    fontSize: '15px',
    backgroundColor: '#a8a29e',
    cursor:'pointer',
  },
  sizeLg: {
    fontSize: '25 !important',
    color: 'white !important',
  },
  textSml: {
   fontSize: '0.875rem !important',
    lineHeight: '1.25rem !important',
    display: 'flex',
    flexGrow: 1,
  },
  textSmla: {
   fontSize: '1rem !important',
    lineHeight: '1.25rem !important',
    display: 'flex',
    flexGrow: 1,
  },
}));
export default useStyles;