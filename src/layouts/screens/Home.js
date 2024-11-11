import './../styles/Home.css'

function Home({ localization }){
    return(
        <div className='home__container'>
            <h1>{ localization.title }</h1>
            <h3>{ localization.subtitle }</h3>
        </div>
    )
}

export default Home