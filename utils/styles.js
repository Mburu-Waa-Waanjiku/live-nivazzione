import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: '#222',
    position: 'sticky',
    top: '-60px',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
      marginTop: 2,
 
    }, 
  },
  brand: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
       display: 'flex',
       fontWeight: 'bold',
       fontSize: '1.6rem',}
  },
  cartnlg: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',}
  },
  smbrand: {
    fontWeight: 'bold !important',
    position: 'absolute !important',
    fontSize: '1.5rem !important',
    transform: 'translate(80%, -50%) !important',
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',}
  },
  smseach: {
    marginTop: 5,
    height: 45,
    display: 'flex',
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems:'center',
    zIndex: 10,
    justifyContent:'center',
    position: 'sticky',
    top: 0,

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
  reviewForm: {
    maxWidth: 800,
    width: '100%',
  },
  reviewItem: {
    marginRight: '1rem',
    borderRight: '1px #808080 solid',
    paddingRight: '1rem',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  menuButton: { padding: 0 },
  mt1: { marginTop: '1rem' },
  // search
  searchSection: {
    transform: 'translate(0%, 180%)',
    zIndex: 15,
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      transform: 'translate(0%, 0%)',

    },
  },
  
  searchForm: {
    border: '1px solid #6a6b6c',
    backgroundColor: '#6a6b6c',
    borderRadius: 20,
    overflow: 'hidden',
    height: 30,

  },
  searchInput: {
    paddingLeft: 10,
    color: 'white',
    '& ::placeholder': {
      color: 'white',
    },
  },
  iconButton: {
    backgroundColor: '#222 !important',
    padding: '5px !important',
    borderRadius: '0 5px 5px 0 !important',
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
  hmStyle: {
    display:'none',
    height: 45,
    backgroundColor: 'white',
  },
  categ: {
    display:'grid !important',
    gap: 10,
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr ',
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
    border: '10px solid #f1f5f9',
    borderRadius: 50,
    width: 50,
    height: 50,
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
  revBorder: {
    border: '1px solid rgb(0, 0, 0.3)',
    borderRadius: 5,
    height:'150px',
    overflow: 'hidden',
    '& ::-webkit-scrollbar': {
       display:'none',                
    },
  },
  revBorderLess: {
    border: '1px solid rgb(0, 0, 0.3)',
    borderRadius: 5,
    overflow: 'hidden',
    height: '700px',
    '& ::-webkit-scrollbar': {
       display:'block',                
    },
  },
  seemorewrapp: {
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  seemore: {
    display: 'inline-block',
    padding: '5px 20px',
    color: 'white',
    backgroundColor: 'black',
    transform: 'translate(0%, -50%)',
    borderRadius: 20,
  },
  badge: {
    color:'white',
    backgroundColor:'#30d04a',
  },
  
}));
export default useStyles;
