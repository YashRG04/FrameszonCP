import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PopupWidget } from "react-calendly";
import { API } from '../../Actions/API_URL.js';

import Intro from '../../Components/Intro/Intro.jsx';
import Outro from "../../Components/Outro/Outro.jsx";
import Banner from '../../Components/Banner/Banner.jsx';
import BestSellers from "../../Components/BestSellers/BestSellers.jsx";
import Shapes from '../../Components/Categories/Categories.jsx';
import Banner2 from '../../Components/Banner/Banner2.jsx';
import Header from "../../Components/Header/Header.jsx";
import CategoryGrid from '../../Components/Categories/CategoryGrid.jsx';
import ShopNow from '../../Components/ShopNow/ShopNow.jsx';
import InternationBrands from "../../Components/InternationalBrands/InternationalBrands.jsx"
import Loader from "../../Components/Loader.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../../assets/banners/b1.png";
import img2 from "../../assets/banners/b2.png";

import img3 from "../../assets/banners/men.png";
import img4 from "../../assets/banners/women.png";
import img5 from "../../assets/banners/kids.png";

import img3mobile from "../../assets/banners/men_mobile.png";
import img4mobile from "../../assets/banners/women_mobile.png";
import img5mobile from "../../assets/banners/kids_mobile.png";

import { getCategories } from '../../Actions/categoryActions.js';
import { CLEAR_ERRORS } from '../../Constants/categoriesConstants.js';

const Home = () => {

  const dispatch = useDispatch();
  const { categories, error, isChanged, loading} = useSelector((state) => state.categories);

  const [menId, setmenId] = useState([]);
  const [womenId, setwomenId] = useState([]);
  const [kidId, setkidId] = useState([]);
  const [bestSellerId, setbestSellerId] = useState([]);

  const [MenData, setMenData] = useState();
  const [WomenData, setWomenData] = useState();
  const [KidsData, setKidsData] = useState();

  // gender name Must be Men, Women, Kids and special name must be Best Seller
  const assignId = () => {
    if(categories)
    {
      if(categories.genders) {
        const men = categories.genders.find((gender) => gender.name === "Men");
        const women = categories.genders.find((gender) => gender.name === "Women");
        const kid = categories.genders.find((gender) => gender.name === "Kids");
        if (men) {
          setmenId(men._id);
        }
        if (women) {
          setwomenId(women._id);
        }
        if (kid) {
          setkidId(kid._id);
        }
      }
      if (categories.specials) {
        const bestSellerSpecial = categories.specials.find((special) => special.name === "Best Seller");
        if (bestSellerSpecial) {
          setbestSellerId(bestSellerSpecial._id);
        }
      }
    }
  }

  useEffect(() => {
    if (error)
      dispatch(CLEAR_ERRORS);

    dispatch(getCategories());

  }, [dispatch, isChanged, error])

  // Assign Ids
  useEffect(() => {
    assignId();
  }, [categories])

  // Fetching Men, Women and Kids data
  useEffect(() => {
    async function fetchData() {
      try {
        if(bestSellerId.length)
          {
            if (menId.length) {
              let men = await API.get(`/api/products?gender[in]=${menId}&special[in]=${bestSellerId}`);
              setMenData(men.data);
            }

            if (womenId.length) {
              let women = await API.get(`/api/products?gender[in]=${womenId}&special[in]=${bestSellerId}`);
              setWomenData(women.data);
            }
            
            if (kidId.length) {
              let kids = await API.get(`/api/products?gender[in]=${kidId}&special[in]=${bestSellerId}`);
              setKidsData(kids.data);
            }
          }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [bestSellerId, menId, categories, womenId, kidId, error])

  return (
    <div>

      <PopupWidget
        url="https://calendly.com/frameszoncp/30min"
        /*
         * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
         * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
         */
        rootElement={document.getElementById("root")}
        text="Book a Free Eye Check Up!"
        textColor="#ffffff"
        color="#2a73b7"
      />

      <Banner />
      <InternationBrands />
      <ShopNow img1={img1} img2={img2}/>

      {MenData && <Banner2 imgURL={img3} imgURLMobile={img3mobile} id="MenBestsellers" />}
      {MenData && <BestSellers gender={"Men"} data={MenData.products} genId={menId} specId={bestSellerId}/>}

      {WomenData && <Banner2 imgURL={img4} imgURLMobile={img4mobile} id="WomenBestsellers" />}
      {WomenData && WomenData.products && <BestSellers gender={"Women"} data={WomenData.products} genId={womenId} specId={bestSellerId}/>}

      {KidsData && <Banner2 imgURL={img5} imgURLMobile={img5mobile}/>}
      {KidsData && <BestSellers gender={"Kids"} data={KidsData.products} genId={kidId} specId={bestSellerId}/>}

      <Header />
      {/* Category */}
      {loading ? <Loader /> : (categories.categories && <CategoryGrid data={categories.categories}/>)}

      {/* Category By shape */}
      {loading ? <Loader /> : (categories.shapes && <Shapes data={categories.shapes} />)}

      <Intro />
      <Outro />
    </div>
  )
}

export default Home