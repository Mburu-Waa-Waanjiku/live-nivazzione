import React, { useContext, useEffect, useState } from 'react';
import { useStateContext } from '../../utils/StateContext';
import ClearIcon from '@mui/icons-material/Clear';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  List,
  ListItem,
  Button,
} from '@material-ui/core';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import { getError } from '../../utils/error';
import { useSnackbar } from 'notistack';
import Image from 'next/image';
import Link from 'next/link';

function Pay() {
    
    const router = useRouter();
    const { setPage, openLogin, handleCartclose, handleCloseNormalOP } = useStateContext();
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();    
    const {
      handleSubmit,
      register,
      formState: { errors },
      setValue,
      control,
     } =  useForm();
    const [county, setCounty] = useState("Select Your Area");

    const { state, dispatch } = useContext(Store);
    const { userInfo, cart } = state;
    const { cartItems, shippingAddress } = cart;

    const round0 = (num) => Math.round(num * 1 + Number.EPSILON) / 1; // 123.456 => 123
    const itemsPrice = round0(
      cartItems.reduce((a, c) => a + c.csize.price * c.quantity, 0)
    );
    const bundleRate = 15 * cartItems.length /1000;
    const ratePrice = itemsPrice * bundleRate
    const bundlePrice = round0(itemsPrice - ratePrice);
    let shippingPrice;
    if (itemsPrice < 7000 && county != 'CBD' ) {
        shippingPrice = 119;
      } else if (itemsPrice < 7000 && county === 'CBD' ) {
          shippingPrice = 20
        } else if (itemsPrice < 10000 && county != 'CBD' ) {
          shippingPrice = 59
      } else if (itemsPrice < 10000 && county === 'CBD' ) {
          shippingPrice = 10
      }  else {
          shippingPrice = 0
      }
    const taxPrice = 0;
    const oldTotalPrice = round0(itemsPrice + shippingPrice + taxPrice);
    const totalPrice = cartItems.length > 20 ? round0(bundlePrice + shippingPrice + taxPrice) : oldTotalPrice;

    const [confirming, setConfirming] = useState(false);
    const [completing, setCompleting] = useState(false);
    const [afterShippinginfo, setAfterShippinginfo] = useState(false);

    const updateStockHandler = async () => {
      try {
        await axios.post(
          '/api/products/updateStock',
          {
            orderItems: cartItems,
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          } 
        );
        dispatch({ type: 'UPDATE_STOCK' });
        console.log('stock updated successfuly');
      } catch (err) {
        //console.log('error updating  stock');
      }
    };

    const placeOrderHandler = async () => {
      if (cartItems.length > 20) {
      closeSnackbar();
      try {
        const { data } = await axios.post(
          '/api/orders',
          {
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            bundlePrice,
            shippingPrice,
            taxPrice,
            oldTotalPrice,
            totalPrice,
            isPaid : true,
            paidAt : Date.now(),
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          } 
        );
        dispatch({ type: 'CART_CLEAR' });
        Cookies.remove('cartItems');
        enqueueSnackbar('Your Order has been placed succesfully', { variant: 'success' });
        setCompleting(true); 
        await new Promise(resolve => setTimeout(resolve, 3000));
        await router.push(`/me`);
        setPage("My Orders");
        handleCloseNormalOP();
        handleCartclose();
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: 'error' });
      }
      }else {
        closeSnackbar();
        try {
          const { data } = await axios.post(
            '/api/orders',
            {
              orderItems: cartItems,
              shippingAddress,
              paymentMethod,
              itemsPrice,
              shippingPrice,
              taxPrice,
              totalPrice,
              isPaid : true,
              paidAt : Date.now(),
            },
            {
              headers: {
                authorization: `Bearer ${userInfo.token}`,
              },
            }
          );
          dispatch({ type: 'CART_CLEAR' });
          Cookies.remove('cartItems');
          enqueueSnackbar('Your Order has been placed succesfully', { variant: 'success' });
          setCompleting(true); 
          await new Promise(resolve => setTimeout(resolve, 3000));
          await router.push(`/me`);
          setPage("My Orders");
          handleCloseNormalOP();
          handleCartclose();
        } catch (err) {
          enqueueSnackbar(getError(err), { variant: 'error' });
          }
        }
    };

    const [cphone, setCphone] = useState();
    const [camount, setCamount] = useState();
    const p4bPaymentHandler = async ({amount, phone}) => {
      setCphone(phone);
      setCamount(amount);

       try {
        setConfirming(true);
        await axios.put(
        '/api/P4Borders/pay',
        {
          amount,
          phone
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        } 
      );
    } catch (err) {
      enqueueSnackbar('Could not Complete your payment');
    }
    };
    const checkPayment = async () => {

       try {
        await axios.post(
        '/api/P4Borders/confirmpay',
        {
          phone: cphone,
          amount: camount,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        } 
      );
     await new Promise(resolve => setTimeout(resolve, 2000));
     updateStockHandler();
     placeOrderHandler();
    } catch (err) {
      enqueueSnackbar('Dear customer, Your Payment was not successful, Check your account balance and try again');
    }
    };

    const [paymentMethod, setPaymentMethod] = useState('');
    const counties = ["Select your Area", "CBD", "SOUTH B", "IMARA DAIMA", "KITENGELA", "LANGATA", "KAREN", "LAVINGTON", "ROASTERS", "JKUAT MAIN STAGE", "JUJA", "KAHAWA SUKARI", "GUMBA ESTATE", "KAHAWA WENDANI", "RUIRU BYPASS", "RUIRU NDANI", "ZIMMERMAN", "TRM", "KAHAWA WEST", "KASARANI", "UMOJA", "BURUBURU", "EMBAKASI/NYAYO ESTATE", "UTAWALA", "NGONG ROAD", "NGONG RACECOURSE", "SYOKIMAU", "MLOLONGO", "THINDIGUA", "KIAMBU", "KIRIGITI", "RUAKA", "MADARAKA","NAIROBI WEST", "LANGATA", "RONGAI", "KISERIAN", "JERICHO", "KOMAROCK", "DONHOLM", "FEDHA", "CHOKA", "RUAI", "JAMUHURI ESTATE", "WESTLANDS", "LORESHO", "KANGEMI", "UTHIRU", "KINOO", "KIKUYU", "TWO RIVERS MALL", "TMALL(LANGATA RD)"];
    const CBD = ["CROCKS AND SANDALS, OPPOSITE SUPREME COURT, NEXT TO REINSURANCE PLAZA ALONG TAIFA ROAD"];
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

    const [dropstation, setDropstation] =  useState("CHOOSE A LOCATION");
    const [view, setView] = useState(false);

    const handleCounty = (event) => {
      setCounty(event.target.value);
      setView(true);
    };
    const handleDropstation =(event) => {
      setDropstation(event.target.value);
    };

    useEffect(() => {
      if (!userInfo) {
        openLogin();
      }
      setValue('amount', totalPrice);
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
        }), { expires: 365 }
      );
      closeSnackbar();
      if (!paymentMethod) {
        enqueueSnackbar('Payment method is required', { variant: 'error' });
      } else {
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
        Cookies.set('paymentMethod', paymentMethod, { expires: 365 });
        setAfterShippinginfo(true);
      }
    };

  return (
    <div>
      <div className="cart-wrapper">
        <div className="w-full h-full flex justify-center place-items-center">
          <div className="cancel-m p-2 absolute right-2 top-2">
            <ClearIcon  onClick={handleCloseNormalOP}/>
          </div>
          <div style={{width:"280px", height:"fit-content", maxHeight: "90vh", overflowY: "scroll", borderRadius:50, backgroundColor:"white"}}>
            {completing ? (
            <div>
              <div style={{color: "#7ac142"}} className="home-ft w-full justify-self-stretch mt-8">
                Payment Succesfull
              </div>
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
              <div className="mb-12">
              </div>
            </div>
            ) : (
            <div className="p-10">
              <div className="home-ft w-full justify-self-stretch">
                Payment
              </div>
              {afterShippinginfo && <div className="home-ft" >
                <Image width={120} height={40} alt="Mpesa" src="https://res.cloudinary.com/dddx5qpji/image/upload/q_100/v1667278803/lipanampesa-removebg-preview_ljrcyk.png">
                </Image>
              </div>}
              <div className="flex justify-center">
                <button
                  className="primary-button w-full mr-4"
                  style={{backgroundColor: "#222", borderRadius: !afterShippinginfo ? 10 : 50, margin: 0}}
                 >
                  <div style={{display: afterShippinginfo ? "none" : "block"}}>
                    <div className="flex justify-between ml-2 mr-2">
                      <div style={{fontFamily: "monospace"}} >
                        Items
                      </div>
                      <div style={{fontFamily: "monospace"}}>
                        KES{itemsPrice}
                      </div>
                    </div>
                    <div className="flex justify-between ml-2 mr-2">
                      <div style={{fontFamily: "monospace"}} >
                        Tax
                      </div>
                      <div style={{fontFamily: "monospace"}}>
                        KES{taxPrice}
                      </div>
                    </div>
                    {view && <div className="flex justify-between ml-2 mr-2">
                      <div style={{fontFamily: "monospace"}} >
                        Shipping
                      </div>
                      <div style={{fontFamily: "monospace"}}>
                        KES{shippingPrice}
                      </div>
                    </div>}
                  </div>
                  {cartItems.length > 20 && view && <div className="flex justify-between ml-2 mr-2">
                      <div style={{fontFamily: "monospace"}} >
                        Total
                      </div>
                      <div style={{fontFamily: "monospace", color: 'red'}}>
                        <b>KES{oldTotalPrice}</b>
                        <div style={{ transform:'translate(-4px, -14px)', width: 70, rotate: '18deg', backgroundColor: 'red', height: 2 }} ></div>
                      </div>
                    </div>}
                  <div className="flex justify-between ml-2 mr-2">
                    <div style={{fontFamily: "monospace"}} >
                      {cartItems.length > 20 ? (
                          <>
                            <div> Amount</div>
                          </>
                        ) : (
                          <>
                            <div style={{display: afterShippinginfo ? "none" : "block"}}> Total</div>
                            <div style={{display: afterShippinginfo ? "block" : "none"}}> Amount</div>
                          </>
                        )
                      }
                    </div>
                    <div style={{fontFamily: "monospace"}}>
                      {view ? (<div>KES{totalPrice}</div>) : (<div>KES{itemsPrice}</div>)}
                    </div>
                  </div>
                </button>
              </div>
              {afterShippinginfo ? (
                <div className="w-full flex justify-center">
                  <div style={{maxWidth: 300}}>
                    <form
                      className="mx-auto max-w-screen-md mt-4"
                      onSubmit={handleSubmit(p4bPaymentHandler)}
                    >
                      <div style={{display: "block"}}>
                        <div className="flex justify-between gap-3">
                          <div className="w-5/12 mb-4 mt-3 grow">
                            <input
                              className="block w-full"
                              placeholder="Mpesa Number 0724.."
                              type="number"
                              id="phone"
                              pattern= "07[0-9]{8}"
                              autoFocus
                              {...register('phone', {
                                required: 'Please enter Phone Number',
                                length: { value: 10, message: 'Phone number is 10 chars' },              
                              })}
                            />
                            {errors.phone && (
                              <div className="text-red-500">{errors.phone.message}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between gap-3 hidden">
                          <div className="w-5/12 mb-4 grow">
                            <label htmlFor="amount">Amount</label>
                            <input
                              className="block w-full"
                              id="amount"
                              readOnly="readonly"
                              autoFocus
                              {...register('amount', {
                                required: 'Please enter Amount',
                              })}
                            />
                            {errors.amount && (
                              <div className="text-red-500">{errors.amount.message}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center mt-3" >
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{fontFamily: "monospace", borderRadius: '50px', backgroundColor: '#222', padding: "8px 35px"}}
                        >
                          {confirming ? (<span> RESEND </span>) : (<span> SEND </span>)}
                        </Button>
                      </div>
                    </form>
                    <div className="flex justify-center">
                      <Button
                        onClick={checkPayment}
                        variant="contained"
                        color="primary"
                        style={{fontFamily: "monospace", borderRadius: '50px', marginTop: 20, display: confirming ? "block" : "none", backgroundColor: '#222', padding: "8px 35px", marginBottom: "10px"}}
                      >
                        CONFIRM
                      </Button>
                    </div>
                  </div>
                </div>) : (
                <div>
                  <h1 className="mb-4 mt-3 sm:mt-5  home-ft" style={{textAlign:"left"}}>Shipping Address</h1>
                  <form
                    className="mx-auto max-w-screen-md margintopFix"
                    onSubmit={handleSubmit(submitHandler)}
                   >
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
                          <div>YOU&apos;RE OUTSIDE NAIROBI AND ITS ENVIRONS ?? </div> 
                          <div>VISIT us on Whatsapp 👇👇 for customized delivery🛍️ 😊</div>
                        </option>            
                      </select>
                      {errors.county && (
                        <div className="text-red-500 ">{errors.county.message}</div>
                      )}
                    </div>
                    <div className="grid w-full gap-3">
                      <div className="w-full mb-4 grow" style={{display: view ? "block" : "none"}}>
                        <label htmlFor="shippingPrice">Shipping Price</label>
                        <input
                          className="w-full block"
                          id="shippingPrice"
                          value= {county === 'CBD' ? "KSh 20" : "KSh 120"}
                          readOnly="readonly"
                        />
                      </div>
                    <div className="w-full mb-4 grow" style={{display: view ? "block" : "none"}}>
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
                    </div>
                    <div className="flex justify-between gap-3">
                    <div className="w-5/12 mb-4 grow" style={{display: view ? "block" : "none"}}>
                      <label htmlFor="phoneNumber">Your Contacts</label>
                      <input
                        className="w-full block"
                        id="phoneNumber"
                        placeholder="07234 ...."
                        type="number"
                        {...register('phoneNumber', {
                          required: 'Please enter Phone number',
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
                        <Button fullWidth type="submit" variant="contained" color="primary" style={{backgroundColor: "#222"}}>
                          Continue
                        </Button>
                      </ListItem>
                      <div className="fixed p-5" style={{bottom:'2vh', right:'2vh'}}>
                        <Link
                          href="https://wa.me/254103477957?text=Hello,%20I'm%20Jane.I'd%20like%20your%20help%20...."
                          legacyBehavior>
                          <i style={{color:"white", padding:"10px 11px", fontSize:"40px", borderRadius:"50px", margin:"4px", backgroundColor:"#30d04a"}} className="fa fa-whatsapp whatsapp-icon"></i>
                        </Link>
                      </div>
                    </List>
                  </form>
                </div>
                )
              }
            </div>)}
          </div>
        </div> 
      </div>
    </div>
  );
}

export default Pay