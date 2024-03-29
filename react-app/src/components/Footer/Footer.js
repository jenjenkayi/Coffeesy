import './Footer.css';

const Footer = () => {

return (
    <footer className='footer-container'>
        <div className="footer-background"></div>
                <div className='footer-links'>
                    <i className="fa-brands fa-github"></i>
                    <a 
                        className='about-me-link'
                        href='https://github.com/jenjenkayi/Coffeesy'
                        target="_blank"
                        rel="noreferrer">
                        Github
                    </a>
                    <i className="fa-brands fa-linkedin"></i>
                    <a 
                        className='about-me-link'
                        href='https://www.linkedin.com/in/jenny-jiang-81033b48/'
                        target="_blank"
                        rel="noreferrer">
                        LinkedIn
                    </a>
                    <i class="fa-regular fa-envelope"></i>                    
                    <a 
                        className='about-me-link'
                        href="mailto:jennyjiang0830@hotmail.com"
                        target="_blank"
                        rel="noreferrer">
                        Email
                    </a>
                </div>
    </footer>
    )
}

export default Footer;