import React from 'react'
import './../styles/Services.css'
import Button from './../components/Button'

function Services({ localization, getCurrentPageIndex }){
    const services = [
        {
            name: localization.content.first.title,
            text: localization.content.first.paragraph,
            icon: 'layout'
        },
        {
            name: localization.content.second.title,
            text: localization.content.second.paragraph,
            icon: 'code'
        }
    ]

    return(
        <div className="services__container">
            <h2>{ localization.title }</h2>
            <div className='services__content'>
                <div className='services__grid'>
                    {services.map((service, index) => (
                        <div key={index} className='services__item'>
                            <div className='services__header'>
                                <div className={`services__icon ${service.icon}__icon`}/>
                                <h3>{ service.name }</h3>
                            </div>
                            <p>{ service.text }</p>
                        </div>
                    ))}
                </div>
                <Button onClick={() => getCurrentPageIndex(3)} value={ localization.button }/>
            </div>
        </div>
    )
}

export default Services