import './../styles/SocialMedias.css'

function SocialMedias(){
    const redirect = url => {
        window.open(url)
    }

    const socialMediaList = [
        {
            name: 'telegram',
            url: 'https://t.me/anysymov_davyd'
        },
        {
            name: 'whatsapp',
            url: 'https://wa.link/ucfhpu'
        },
        {
            name: 'github',
            url: 'https://github.com/anysymov-davyd'
        },
        {
            name: 'email',
            url: 'https://mail.google.com/mail/?view=cm&to=anysymovdavyd@gmail.com'
        }
    ]
    const socialMediaItems = socialMediaList.map((item, index) =>
        <div onClick={() => redirect(item.url)} href={item.url} key={index} className={`social-media-item ${item.name}`}/>
    )
    return (
        <div className='social-medias'>
            { socialMediaItems }
        </div>
    )
}

export default SocialMedias