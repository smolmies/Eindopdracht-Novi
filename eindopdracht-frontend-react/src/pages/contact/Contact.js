import React from 'react';
import './Contact.scss';
import Header from "../../components/header/Header";

function Contact(props) {
    return (
        <>
            <Header />
            <div className='contact-info'>
                <h2>Contact opnemen</h2>
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
                        Mijn email: denisebrux@live.nl
                    <br />
                        of mijn telefoonnummer: 06 - 48928343 (Bereikbaar via WhatsApp)
                </p>
            </div>
        </>
    );
}

export default Contact;