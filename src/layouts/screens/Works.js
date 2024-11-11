import React, { useEffect, useState } from 'react'

// Including a dependency for the slider
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './../styles/Works.css'

const Works = ({ localization, works }) => {
    const [showHint, setShowHint] = useState(true)
    // This useState is used to hide slider for 2 seconds after launching the site 
    const [showComponent, setShowComponent] = useState(false)
    // Amount of works to show, which dependens on window width
    const [slidesToShow, setSlidesToShow] = useState(window.innerWidth > 880 ? 4 : window.innerWidth > 640 ? 3 : window.innerWidth > 350 ? 2 : 1)
    // This useState is used to understand how far is user swiping, so this way defines is user clicking or swiping
    const [mouseOffset, setMouseOffset] = useState(0)

    // Update amount of works to show
    window.onresize = () => {
        setSlidesToShow(window.innerWidth > 880 ? 4 : window.innerWidth > 640 ? 3 : window.innerWidth > 350 ? 2 : 1)
    }

    // Hide the slider for 2 second after launching the site
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowComponent(true)
        }, 2000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    // Configuration for the slider
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToShow,
        arrows: false
    }

    // Fill empty places in the slider with label "NO WORK"
    const empty = () => {
        if(works.length > 3) return
        let items = []
        for(let i = 0; i < slidesToShow - works.length; ++i){
            items.push(
                <div key={i} className='works__item'>
                    <a className='works__item-title caps2 works__no-work'>{ localization.no_work }</a>
                </div>
            )
        }
        return items
    }
    
    return(
        <div style={{ opacity: showComponent ? 1 : 0 }} className="works__container">
            <div className="works__header">
                <h2>{ localization.title }</h2>
                <p>{ localization.paragraph }</p>
                <div className='caps2 hint' style={{ opacity: showHint ? 1 : 0 }}>Scroll</div>
            </div>
            {showComponent ? (
            <Slider {...settings} className="works__slider">
                {works.map((elem, index) => (
                    <div
                        onPointerMove={() => setShowHint(false)}
                        onMouseDown={e => {
                            setMouseOffset(e.pageX)
                        }}
                        onMouseUp={
                            e => {
                                if(e.pageX - mouseOffset === 0){
                                    if(e.target.className.split(' ')[0] === 'works__item-link'){
                                        window.open(elem.data.source)
                                    } else {
                                        window.open(elem.data.url)
                                    }
                                }
                            }
                        }
                        key={index}
                        className='works__item'
                    >
                        <div style={{ background: `url(${elem.image}) no-repeat`, backgroundSize: 'cover' }} className='works__item-background'>
                            <div className='works__item-container'>
                                <a className='works__item-title caps1'>{ elem.data.name }</a>
                                <a className='works__item-link text'>{ elem.data.type === 'application' ? localization.see_on_github : '' }</a>
                            </div>
                        </div>
                    </div>
                ))}
                { empty() }
            </Slider>) : null }
        </div>
    )
}

export default Works