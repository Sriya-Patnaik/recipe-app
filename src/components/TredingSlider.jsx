import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const TrendingSlider = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = '829ad0824a03416caf4e8c2458580e0a'; // Replace 'YOUR_SPOONACULAR_API_KEY' with your actual API key
                const api = await fetch(`https://api.spoonacular.com/recipes/random?number=5&apiKey=${apiKey}`);
                const response = await api.json();

                setData(response.recipes);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    var settings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 500,
        cssEase: "linear"
    };

    return (
        <div style={{
            height: '26vh',
            width: '99%',
            margin: 'auto',
            overflowX: 'hidden'
        }}>
            <Slider {...settings} style={{ marginTop: '1rem' }}>
                {data.map(recipe => (
                    <Link to={`/${recipe.id}`} key={recipe.id}>
                        <div className='slider2'>
                            <img src={recipe.image} alt={recipe.title} style={{ width: '10rem', height: '7rem' }} />
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default TrendingSlider;
