import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const PopularSlider = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = '829ad0824a03416caf4e8c2458580e0a'; // Replace 'YOUR_SPOONACULAR_API_KEY' with your actual API key
                const api = await fetch(`https://api.spoonacular.com/recipes/random?number=6&apiKey=${apiKey}`);
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
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };

    return (
        <div style={{
            height: '56vh',
            width: '90%',
            margin: 'auto',
        }}>
            <Slider {...settings} style={{ margin: '1rem' }}>
                {data.map(recipe => (
                    <Link to={`/${recipe.id}`} key={recipe.id}>
                        <div className='slider'>
                            <img src={recipe.image} alt={recipe.title} style={{ width: '18rem', height: '17rem' }} />
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default PopularSlider;
