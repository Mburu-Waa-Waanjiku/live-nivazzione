import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import Image from 'next/image';
import { Store } from '../utils/Store';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

export default function ShippingScreen() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [paymentMethod, setPaymentMethod] = useState('');
  const counties = ["CBD", "SOUTH B", "IMARA DAIMA", "KITENGELA", "LANGATA", "KAREN", "LAVINGTON", "ROASTERS", "JKUAT MAIN STAGE", "JUJA", "KAHAWA SUKARI", "GUMBA ESTATE", "KAHAWA WENDANI", "RUIRU BYPASS", "RUIRU NDANI", "ZIMMERMAN", "TRM", "KAHAWA WEST", "KASARANI", "UMOJA", "BURUBURU", "EMBAKASI/NYAYO ESTATE", "UTAWALA", "NGONG ROAD", "NGONG RACECOURSE", "SYOKIMAU", "MLOLONGO", "THINDIGUA", "KIAMBU", "KIRIGITI", "RUAKA", "MADARAKA","NAIROBI WEST", "LANGATA", "RONGAI", "KISERIAN", "JERICHO", "KOMAROCK", "DONHOLM", "FEDHA", "CHOKA", "RUAI", "JAMUHURI ESTATE", "WESTLANDS", "LORESHO", "KANGEMI", "UTHIRU", "KINOO", "KIKUYU", "TWO RIVERS MALL", "TMALL(LANGATA RD)"];
  const CBD = ["PHILADELPHIA HOUSE, NEXT TO AFYA CENTER", "STAR MALL, TOM MBOYA"];
  const SOUTHB = ["SHOPPING CENTER-ELLYS DRY CLEANERS", "SOUTH B SANASANA-DELIGHT BEAUTY"];
  const IMARADAIMA = ["IMARA DAIMA ESTATE JUNCTION, MWANIKI CLOTHING STORE", ];
  const KITENGELA = ["KOBIL PETROL STATION JUPITER HOUSE, SUDS AND DUS"];
  const KAREN = ["KAREN HARDY @ ACE OUTFITS", "KAREN SHOPPING CENTER @ SHOP", "NEAR GALLERIA @ MEDITAS", "THE PASTRY PLACE"];
  const LAVINGTON = ["LAVINGTON MALL, HALFPRICED BOOKS"];
  const ROASTERS = ["WINKS ELECTRICALS ON THE GREEN SAFARICOM BUILDING"];
  const JKUATMAINSTAGE = ["SPYKES GAMING"];
  const JUJA = ["JIMNGASH PHONES AND ACCESSORIES"];
  const KAHAWASUKARI = ["SHADES OF BEAUTY, STALL NO. 2"];
  const GUMBAESTATE = ["HAIR CUT EXPRESS & SPA, GUMBA STAGE"];
  const KAHAWAWENDANI = ["EVERYTING MISTIQUE, OFRMER BECKS NEXT TO THE FOOTBRIDGE", "VICTORY CEREALS & SHOP, OPPOSITE WENDANI JUNIOR & ALIJAM HOUSE"];
  const RUIRUBYPASS = ["KWANZA KIDS BABY SHOP, HAMPTON HEIGHTS"];
  const RUIRUNDANI = ["THE CHANGES, ROWINI HOUSE GROUND FLOOR"];
  const ZIMMERMAN = ["MEGATEX FRESH PRODUCTS, BEHIND DELIVERANCE CHURCH"];
  const TRM = ["SISTER LAUNDRY, BOON APARTMENTS GROUNDFLOOR"];
  const KAHAWAWEST = ["CALFIX PHONE REPAIR, OPPOSITE SENDEYO HOUSE"];
  const KASARANI = ["JANPHARM PHARMACEUTICALS, ICIPE ROAD OPPOSITE REGIONAL CENTRE FOR MAPPING", "KASARANI SEASONS, PINKY ROSYSALON", "KASARANI STAGE YA MATERNITY, LEBRAN FASHON", "KASARANI SUNTON-VENUE BEAUTY & COSMETICS"];
  const UMOJA = ["EXXIONI DRY CLEANERS, UMOJA MARKET", "UMOJA 1, MTINDWA STAGE", "UMOJA INNERCORE", "UMOJA KWA CHIEF"];
  const BURUBURU = ["HOPE SALON, BURUBURUCO-OPERATIVE BANK"];
  const EMBAKASI = ["NYAYO ESTATE-THE LINK CYBER AT TOTAL PETROL STATION"];
  const UTAWALA = ["SHEKS BABY SHOP, BENEDICTA NEAR LEXO", "STREAM LINK ENTERTAINMENT, UTAWALA SHOOTERS"];
  const NGONG = ["THE YARD MOVIE SHOP, ILADE OIL PETROL STATION"];
  const NGONGRACECOURSE = ["GESMART, NEXT TO KALABASH LOUNGE"];
  const MLOLONGO = ["NOMADIC BRANDS BEHIND OLYMPIC PETROL STATION"];
  const SYOKIMAU = ["SYOKIMAU KATANI RD- RAKEL'S BAKERY", "SYOKIMAU LUQMAN PETROL STATION-ECOBELLA TYRES", "THE LIGHTHOUSE ACQUARIUMS, OPP FAMILY BANK"];
  const THINDIGUA = ["FERUZI TOWERS, OPP QUICKMART"];
  const KIAMBU = ["KELLAH BEAUTY 2.0 NAIL AND SPA, OPP KIAMBU POLICE STATION"];
  const KIRIGITI = ["PLAY PAUSE ACCESSORIEZ, SHOP A22, FRAPU COMPLEX"];
  const RUAKA = ["RUAKA ARCADE, ALL QUTE DYNASTY COSMETICS"];
  const MADARAKA = ["MADARAKA SHOPPING CTR-MAKEOS AUTO SPARE"];
  const WEST = ["NAIROBI WEST SHOPPING CENTER, SAMKEN ELECTRONICS", ""] 
  const LANGATA = ["PORAVIM BUSINESS COMPLEX, TREND M SALON"];
  const KISERIAN = ["XTREME MEDIA, BELOW LIQUOR WELL LOUNGE OPP TOTAL"];
  const RONGAI = ["XTREME MEDIA, TUSKYS STAGE NEXT TO CLEAN SHELF", "XTREME MEDIA, BEHIND QUICKMART FORMER TUMAINI", "XTREME MEDIA OPPOSITE THINK TWICE"];
  const JERICHO = ["JERICHO MARKET"];
  const KOMAROCK = ["ENDLESS FANCY WEAR GREEN SHOP WITH BAGS, OPP PHASE FOUR STAGE"];
  const DONHOLM = ["GREENSPAN, ARCADE LINK PS AND MOVIE SHOP", "SIRKAL MATIYO CYBER OPP PEFA CHURCH"];
  const FEDHA = ["VYRIAN SALON, OPP FRONT QUICKMART EXIT"];
  const CHOKA = ["POA DEALZ INVESTMENTS NEXT TO ASTRID VILLAS"];
  const RUAI = ["GATWIC BUSINESS CENTRE, VISION TECH CYBER"];
  const JAMUHURIESTATE =["SHOP DIRECT, NEXT TO FORMER BUYRITE SUPERMARKET"];
  const WESTLANDS = ["COMMERCIAL CENTRE, SHOP N.O 10, FITS ON TIME"];
  const LORESHO = ["SHOPPING CENTRE, BOUTIQI DISNEY CLOTHIER"];
  const KANGEMI = ["FLEXNETT CYBER, rOOM 32, HOT POINT BAZAAR "];
  const UTHIRU = ["SHOPPING CENTRE, KARSAM GAS POINT"];
  const KINOO = ["THE SHOE RACK,  THE JAMAICAN PLAZA"];
  const KIKUYU = ["PRIME EYE CARE, NEXT TO SENIORS DRIVING SCHOOL"];
  const RIVERS = ["TAZAMA GALLERY, HOMECARE AND HARDWARE"];
  const TMALL = ["CHEMKAT ENTERPRISES"];

  const [county, setCounty] = useState("CHOOSE A LOCATION");
  const [dropstation, setDropstation] =  useState("CHOOSE A LOCATION");
  const [view, setView] = useState(false);

  const handleCounty = (event) => {
    setCounty(event.target.value);
    setView(true);
  };
  const handleDropstation =(evant) => {
    setDropstation(event.target.value);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const { cartItems, shippingAddress } = cart;
  const router = useRouter();
  

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
    setValue('firstName', shippingAddress.firstName);
    setValue('lastName', shippingAddress.lastName);
    setValue('county', shippingAddress.county);
    setValue('dropstation', shippingAddress.dropstation);
    setValue('phoneNumber', shippingAddress.phoneNumber);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ firstName, county, dropstation, phoneNumber, lastName }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { firstName, county, dropstation, phoneNumber, lastName },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          firstName,
          lastName,
          county,
          dropstation,
          phoneNumber,
        },
      })
    );
    closeSnackbar();
    if (!paymentMethod) {
      enqueueSnackbar('Payment method is required', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod', paymentMethod);
      router.push('/placeorder');
    }
  };
  

  return (
    <Layout title="Shipping Address">
      <form
        className="mx-auto max-w-screen-md margintopFix"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 mt-3 sm:mt-5  home-ft" style={{textAlign:"left"}}>Shipping Address</h1>
        <div className="flex justify-between gap-3">
        <div className="w-5/12 mb-4 grow">
          <label htmlFor="fullName">First Name</label>
          <input
            className="block w-full"
            id="firstName"
            autoFocus
            {...register('firstName', {
              required: 'Please enter first name',
            })}
          />
          {errors.firstName && (
            <div className="text-red-500">{errors.firstName.message}</div>
          )}
        </div>
        <div className="w-5/12 mb-4 grow">
          <label htmlFor="Last Name">Last Name</label>
          <input
            className="block w-full"
            id="lastName"
            autoFocus
            {...register('lastName', {
              required: 'Please enter last name',
            })}
          />
          {errors.lastName && (
            <div className="text-red-500">{errors.lastName.message}</div>
          )}
        </div>
        </div>
        <div className="mb-4">
          <label htmlFor="county">Your Area</label>
          <select
              {...register('county')}
              control={control}
              value={county}
              className="block w-full"
              onChange={handleCounty}
          >
            {counties.map((counties) => (
              <option key={counties} value={counties}>
                {counties}
              </option>
            ))}  
            <option disabled style={{color: 'green', display:'block'}}>
              <div>YOU'RE OUTSIDE NAIROBI AND ITS ENVIRONS ?? </div> 
              <div>VISIT us on Whatsapp 👇👇 for customized delivery🛍️ 😊</div>
            </option>            
          </select>
          {errors.county && (
            <div className="text-red-500 ">{errors.county.message}</div>
          )}
        </div>
        <div className="flex justify-between gap-3">
        <div className="w-5/12 mb-4 grow" style={{display: view ? "block" : "none"}}>
          <label htmlFor="dropstation">Delivery Location</label>
          <select
              {...register('dropstation')}
              control={control}
              value={dropstation}
              className="block w-full"
              onChange={handleDropstation}
           >
            <option style={{color:"green"}} value="Choose a Location">Choose a Location</option>
            {county === 'CBD' && 
              <> 
                {CBD.map((CBD) => (
                  <option key={CBD} value={CBD}>
                   {CBD}
                  </option>
                ))} 
              </>
            }
            {county === 'SOUTH B' && 
              <> 
                {SOUTHB.map((SOUTHB) => (
                  <option key={SOUTHB} value={SOUTHB}>
                   {SOUTHB}
                  </option>
                ))} 
              </>
            }
            {county === 'IMARA DAIMA' && 
              <> 
                {IMARADAIMA.map((IMARADAIMA) => (
                  <option key={IMARADAIMA} value={IMARADAIMA}>
                   {IMARADAIMA}
                  </option>
                ))} 
              </>
            }
            {county === 'KITENGELA' && 
              <> 
                {KITENGELA.map((KITENGELA) => (
                  <option key={KITENGELA} value={KITENGELA}>
                   {KITENGELA}
                  </option>
                ))} 
              </>
            }
            {county === 'KAREN' && 
              <> 
                {KAREN.map((KAREN) => (
                  <option key={KAREN} value={KAREN}>
                   {KAREN}
                  </option>
                ))} 
              </>
            }
            {county === 'LAVINGTON' && 
              <> 
                {LAVINGTON.map((LAVINGTON) => (
                  <option key={LAVINGTON} value={LAVINGTON}>
                   {LAVINGTON}
                  </option>
                ))} 
              </>
            }
            {county === 'PANGANI' && 
              <>
                {PANGANI.map((PANGANI) => (
                  <option key={PANGANI} value={PANGANI}>
                   {PANGANI}
                  </option>
                ))}
              </>
            }
            {county === 'ROASTERS' && 
              <>
                {ROASTERS.map((ROASTERS) => (
                  <option key={ROASTERS} value={ROASTERS}>
                   {ROASTERS}
                  </option>
                ))}
              </>
            }
            {county === 'JKUAT MAIN STAGE' && 
              <>
                {JKUATMAINSTAGE.map((JKUATMAINSTAGE) => (
                  <option key={JKUATMAINSTAGE} value={JKUATMAINSTAGE}>
                   {JKUATMAINSTAGE}
                  </option>
                ))}
              </>
            }
            {county === 'JUJA' && 
              <>
                {JUJA.map((JUJA) => (
                  <option key={JUJA} value={JUJA}>
                   {JUJA}
                  </option>
                ))}
              </>
            }
            {county === 'KAHAWA SUKARI' && 
              <>
                {KAHAWASUKARI.map((KAHAWASUKARI) => (
                  <option key={KAHAWASUKARI} value={KAHAWASUKARI}>
                   {KAHAWASUKARI}
                  </option>
                ))}
              </>
            }
            {county === 'GUMBA ESTATE' && 
              <>
                {GUMBAESTATE.map((GUMBAESTATE) => (
                  <option key={GUMBAESTATE} value={GUMBAESTATE}>
                   {GUMBAESTATE}
                  </option>
                ))}
              </>
            }
            {county === 'KAHAWA WENDANI' && 
              <>
                {KAHAWAWENDANI.map((KAHAWAWENDANI) => (
                  <option key={KAHAWAWENDANI} value={KAHAWAWENDANI}>
                   {KAHAWAWENDANI}
                  </option>
                ))}
              </>
            }
            {county === 'RUIRU BYPASS' && 
              <>
                {RUIRUBYPASS.map((RUIRUBYPASS) => (
                  <option key={RUIRUBYPASS} value={RUIRUBYPASS}>
                   {RUIRUBYPASS}
                  </option>
                ))}
              </>
            }
            {county === 'RUIRU NDANI' && 
              <>
                {RUIRUNDANI.map((RUIRUNDANI) => (
                  <option key={RUIRUNDANI} value={RUIRUNDANI}>
                   {RUIRUNDANI}
                  </option>
                ))}
              </>
            }
            {county === 'ZIMMERMAN' && 
              <>
                {ZIMMERMAN.map((ZIMMERMAN) => (
                  <option key={ZIMMERMAN} value={ZIMMERMAN}>
                   {ZIMMERMAN}
                  </option>
                ))}
              </>
            }
            {county === 'TRM' && 
              <>
                {TRM.map((TRM) => (
                  <option key={TRM} value={TRM}>
                   {TRM}
                  </option>
                ))}
              </>
            }
            {county === 'KAHAWA WEST' && 
              <>
                {KAHAWAWEST.map((KAHAWAWEST) => (
                  <option key={KAHAWAWEST} value={KAHAWAWEST}>
                   {KAHAWAWEST}
                  </option>
                ))}
              </>
            }
            {county === 'KASARANI' && 
              <>
                {KASARANI.map((KASARANI) => (
                  <option key={KASARANI} value={KASARANI}>
                   {KASARANI}
                  </option>
                ))}
              </>
            }
            {county === 'UMOJA' && 
              <>
                {UMOJA.map((UMOJA) => (
                  <option key={UMOJA} value={UMOJA}>
                   {UMOJA}
                  </option>
                ))}
              </>
            }
            {county === 'BURUBURU' && 
              <>
                {BURUBURU.map((BURUBURU) => (
                  <option key={BURUBURU} value={BURUBURU}>
                   {BURUBURU}
                  </option>
                ))}
              </>
            }
            {county === 'EMBAKASI/NYAYO ESTATE' && 
              <>
                {EMBAKASI.map((EMBAKASI) => (
                  <option key={EMBAKASI} value={EMBAKASI}>
                   {EMBAKASI}
                  </option>
                ))}
              </>
            }
            {county === 'UTAWALA' && 
              <>
                {UTAWALA.map((UTAWALA) => (
                  <option key={UTAWALA} value={UTAWALA}>
                   {UTAWALA}
                  </option>
                ))}
              </>
            }
            {county === 'NGONG ROAD' && 
              <>
                {NGONG.map((NGONG) => (
                  <option key={NGONG} value={NGONG}>
                   {NGONG}
                  </option>
                ))}
              </>
            }
            {county === 'NGONG RACECOURSE' && 
              <>
                {NGONGRACECOURSE.map((NGONGRACECOURSE) => (
                  <option key={NGONGRACECOURSE} value={NGONGRACECOURSE}>
                   {NGONGRACECOURSE}
                  </option>
                ))}
              </>
            }
            {county === 'MLOLONGO' && 
              <>
                {MLOLONGO.map((MLOLONGO) => (
                  <option key={MLOLONGO} value={MLOLONGO}>
                   {MLOLONGO}
                  </option>
                ))}
              </>
            }
            {county === 'SYOKIMAU' && 
              <>
                {SYOKIMAU.map((SYOKIMAU) => (
                  <option key={SYOKIMAU} value={SYOKIMAU}>
                   {SYOKIMAU}
                  </option>
                ))}
              </>
            }
            {county === 'THINDIGUA' && 
              <>
                {THINDIGUA.map((THINDIGUA) => (
                  <option key={THINDIGUA} value={THINDIGUA}>
                   {THINDIGUA}
                  </option>
                ))}
              </>
            }
            {county === 'KIAMBU' && 
              <>
                {KIAMBU.map((KIAMBU) => (
                  <option key={KIAMBU} value={KIAMBU}>
                   {KIAMBU}
                  </option>
                ))}
              </>
            }
            {county === 'KIRIGITI' && 
              <>
                {KIRIGITI.map((KIRIGITI) => (
                  <option key={KIRIGITI} value={KIRIGITI}>
                   {KIRIGITI}
                  </option>
                ))}
              </>
            }
            {county === 'RUAKA' && 
              <>
                {RUAKA.map((RUAKA) => (
                  <option key={RUAKA} value={RUAKA}>
                   {RUAKA}
                  </option>
                ))}
              </>
            }
            {county === 'MADARAKA' && 
              <>
                {MADARAKA.map((MADARAKA) => (
                  <option key={MADARAKA} value={MADARAKA}>
                   {MADARAKA}
                  </option>
                ))}
              </>
            }
            {county === 'NAIROBI WEST' && 
              <>
                {WEST.map((WEST) => (
                  <option key={WEST} value={WEST}>
                   {WEST}
                  </option>
                ))}
              </>
            }
            {county === 'LANGATA' && 
              <>
                {LANGATA.map((LANGATA) => (
                  <option key={LANGATA} value={LANGATA}>
                   {LANGATA}
                  </option>
                ))}
              </>
            }
            {county === 'KISERIAN' && 
              <>
                {KISERIAN.map((KISERIAN) => (
                  <option key={KISERIAN} value={KISERIAN}>
                   {KISERIAN}
                  </option>
                ))}
              </>
            }
            {county === 'RONGAI' && 
              <>
                {RONGAI.map((RONGAI) => (
                  <option key={RONGAI} value={RONGAI}>
                   {RONGAI}
                  </option>
                ))}
              </>
            }
            {county === 'JERICHO' && 
              <>
                {JERICHO.map((JERICHO) => (
                  <option key={JERICHO} value={JERICHO}>
                   {JERICHO}
                  </option>
                ))}
              </>
            }
            {county === 'KOMAROCK' && 
              <>
                {KOMAROCK.map((KOMAROCK) => (
                  <option key={KOMAROCK} value={KOMAROCK}>
                   {KOMAROCK}
                  </option>
                ))}
              </>
            }
            {county === 'DONHOLM' && 
              <>
                {DONHOLM.map((DONHOLM) => (
                  <option key={DONHOLM} value={DONHOLM}>
                   {DONHOLM}
                  </option>
                ))}
              </>
            }
            {county === 'FEDHA' && 
              <>
                {FEDHA.map((FEDHA) => (
                  <option key={FEDHA} value={FEDHA}>
                   {FEDHA}
                  </option>
                ))}
              </>
            }
            {county === 'CHOKA' && 
              <>
                {CHOKA.map((CHOKA) => (
                  <option key={CHOKA} value={CHOKA}>
                   {CHOKA}
                  </option>
                ))}
              </>
            }
            {county === 'RUAI' && 
              <>
                {RUAI.map((RUAI) => (
                  <option key={RUAI} value={RUAI}>
                   {RUAI}
                  </option>
                ))}
              </>
            }
            {county === 'JAMUHURI ESTATE' && 
              <>
                {JAMUHURIESTATE.map((JAMUHURIESTATE) => (
                  <option key={JAMUHURIESTATE} value={JAMUHURIESTATE}>
                   {JAMUHURIESTATE}
                  </option>
                ))}
              </>
            }
            {county === 'WESTLANDS' && 
              <>
                {WESTLANDS.map((WESTLANDS) => (
                  <option key={WESTLANDS} value={WESTLANDS}>
                   {WESTLANDS}
                  </option>
                ))}
              </>
            }
            {county === 'LORESHO' && 
              <>
                {LORESHO.map((LORESHO) => (
                  <option key={LORESHO} value={LORESHO}>
                   {LORESHO}
                  </option>
                ))}
              </>
            }
            {county === 'KANGEMI' && 
              <>
                {KANGEMI.map((KANGEMI) => (
                  <option key={KANGEMI} value={KANGEMI}>
                   {KANGEMI}
                  </option>
                ))}
              </>
            }
            {county === 'UTHIRU' && 
              <>
                {UTHIRU.map((UTHIRU) => (
                  <option key={UTHIRU} value={UTHIRU}>
                   {UTHIRU}
                  </option>
                ))}
              </>
            }
            {county === 'KINOO' && 
              <>
                {KINOO.map((KINOO) => (
                  <option key={KINOO} value={KINOO}>
                   {KINOO}
                  </option>
                ))}
              </>
            }
            {county === 'KIKUYU' && 
              <>
                {KIKUYU.map((KIKUYU) => (
                  <option key={KIKUYU} value={KIKUYU}>
                   {KIKUYU}
                  </option>
                ))}
              </>
            }
            {county === 'TWO RIVERS MALL' && 
              <>
                {RIVERS.map((RIVERS) => (
                  <option key={RIVERS} value={RIVERS}>
                   {RIVERS}
                  </option>
                ))}
              </>
            }
            {county === 'TMALL(LANGATA RD)' && 
              <>
                {TMALL.map((TMALL) => (
                  <option key={TMALL} value={TMALL}>
                   {TMALL}
                  </option>
                ))}
              </>
            }
          </select>
          {errors.dropstation && (
            <div className="text-red-500 ">{errors.dropstation.message}</div>
          )}
        </div>
        <div className="w-5/12 mb-4 grow" style={{display: view ? "block" : "none"}}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            className="w-full block"
            id="phoneNumber"
            placeorder="0723194065"
            type="number"
            {...register('phoneNumber', {
              required: 'Please enter postal code',
              length: { value: 10, message: 'Phone number is 10 chars' },              
            })}
          />
          {errors.phoneNumber && (
            <div className="text-red-500 ">{errors.phoneNumber.message}</div>
          )}
        </div>
        </div>
        <h1 className="mb-4 mt-3 sm:mt-5  home-ft" style={{textAlign:"left"}}>Payment method</h1>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  disabled
                  label="Equitel"
                  value="Equitel"
                  control={<Radio />}
                ></FormControlLabel>
                <div className="flex">
                  <FormControlLabel
                    value="Mpesa"
                    control={<Radio />}
                  ></FormControlLabel>
                  <div style={{display:"flex", color:"gray"}}><Image width={120} height={40} alt="Mpesa" src="https://res.cloudinary.com/dddx5qpji/image/upload/q_100/v1667278803/lipanampesa-removebg-preview_ljrcyk.png"></Image></div>
                </div>
                <FormControlLabel
                  label="M-coop"
                  disabled
                  value="M-coop"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </ListItem>
          <div className="fixed p-5" style={{bottom:'2vh', right:'2vh'}}>
            <Link href="https://wa.me/message/LLYAJG6L323CP1">
              <i style={{color:"white", padding:"10px 11px", fontSize:"40px", borderRadius:"50px", margin:"4px", backgroundColor:"#30d04a"}} className="fa fa-whatsapp whatsapp-icon"></i>
            </Link>
          </div>
        </List>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;

