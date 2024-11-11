import './../styles/About.css'
import Button from './../components/Button'
import SocialMedias from '../components/SocialMedias'

const cv_url = {
    en: 'https://drive.google.com/file/d/1NLWl7oY-Cc-qx28sjs4Mi0GRRSXFlTgh/view?usp=sharing',
    de: 'https://drive.google.com/file/d/19sXeKkUQ45N2q4i2RZJkxm0BRVw6gsol/view?usp=sharing',
    ua: 'https://drive.google.com/file/d/1IXmX6kbfuV0dIJB44uJfGcF_-lmLxEQk/view?usp=sharing',
    ru: 'https://drive.google.com/file/d/1jll5nKRzIahPiqmTbo6Dz52r2hBVKc8X/view?usp=sharing'
}

function About({ localization, languageId }){
    // A function to download CV
    const handleOpenPDF = langId => {
        window.open(cv_url[langId])
    }

    return(
        <div className='about__container'>
            <div className='about__first-column'>
                <h2>{ localization.title }</h2>
                <div className='about__languages'>
                    <div className='about__language-names'>
                        <div className='about__language-item about__ukrainian caps2'>{ localization.languages.ukrainian }</div>
                        <div className='about__language-item about__russian caps2'>{ localization.languages.russian }</div>
                        <div className='about__language-item about__english caps2'>{ localization.languages.english }</div>
                        <div className='about__language-item about__german caps2'>{ localization.languages.german }</div>
                    </div>
                    <div className='about__levels'>
                        <p>{ localization.levels.native }</p>
                        <p>{ localization.levels.native }</p>
                        <p>{ localization.levels.b2 }</p>
                        <p>{ localization.levels.b1 }</p>
                    </div>
                </div>
            </div>
            <div className='about__second-column'>
                <div className='about__paragraph'>
                    <p>{ localization.paragraph.first }</p>
                    <p>{ localization.paragraph.second }</p>
                </div>
                <div className='about__contacts'>
                    <div onClick={() => handleOpenPDF(languageId)}><Button value={ localization.button }/></div>
                    <SocialMedias/>
                </div>
            </div>
        </div>
    )
}

export default About