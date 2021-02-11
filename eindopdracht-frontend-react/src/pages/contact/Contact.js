import React from 'react';
import './Contact.scss';
import fullCatLogo from "../../components/styles/aan-de-cuwaart-logo-transparent.png";

function Contact() {
    return (
        <>

            <div className='contact'>
                <img id="colored-logo" src={fullCatLogo} alt="Logo van het pension"/>
                <div id="contact-info">
                    <h3>
                        Mocht u vragen hebben voor mij voordat U een afspraak wilt maken?
                    </h3>
                    <p>
                        Bijvoorbeeld vragen over onze verblijven, onze regels,
                        hoe de verzorging verloopt of hoe ik U kan helpen in uw situatie?
                        <br />
                        Andere vragen of een leuk kennismakingsgesprek zijn natuurlijk ook van harte welkom!
                    </p>
                    <p>
                            Neem dan contact met mij op via:
                        <br />
                            Mijn email: mail@mail.com
                        <br />
                            of mijn telefoonnummer: 06 - 123456789 (Bereikbaar via WhatsApp)
                    </p>
                </div>
            </div>
        </>
    );
}

export default Contact;