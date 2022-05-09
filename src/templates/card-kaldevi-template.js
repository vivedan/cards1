import React from 'react';

import { graphql, navigate } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import CanvasCards from '../components/CanvasCards';

import * as cardStyles from '../styles/cardsTemplate.module.css';

function CardStandardTemplate( {data} ) {

    //console.log(data);

    const {color, contacts, email, instagram, job, maps, name, phone, photo, address, slug, surname, website, whatsapp} = data.info.nodes[0].frontmatter;

    const mapLink = "https://www.google.es/maps/place/Kaldevi+Ingenier%C3%ADa+Geri%C3%A1trica+S.L./@39.4309776,-0.4038842,19.86z/data=!4m5!3m4!1s0xd604eee2c312083:0xfadef9b8df85715b!8m2!3d39.4310722!4d-0.4036115"

    console.log(whatsapp);

    return ( 
        <div>
            <div className={cardStyles.infoCont}>
                <div className={cardStyles.interactiveAssets}>
                    {/* <img className={`${cardStyles.round} ${cardStyles.profilePic}`} src={photo.publicURL} alt="Profile Pic" /> */}
                    <div className={cardStyles.dataCont}>
                        <img className={`${cardStyles.round} ${cardStyles.profilePic}`} src={photo.publicURL} alt="Profile Pic" />
                        <div className={cardStyles.infoPersonal}>
                            <h2 className={`${cardStyles.textItem} ${cardStyles.nameBC}`}>{name + " " + surname}</h2>
                            <h3 className={cardStyles.textItem}>{job}</h3>
                            <p className={cardStyles.textItem}>{email}</p>
                            {phone.map(number =>(<p className={cardStyles.textItem} key={number}>{number}</p>))}
                            <p className={`${cardStyles.textItem} ${cardStyles.address}`}>{address}</p>
                            <a href={contacts.publicURL} download={contacts.publicURL} target="_blank" rel="noreferrer" aria-label="add contact" className={cardStyles.contactButton}><p>Añádeme a contactos</p></a>
                        </div>
                    </div>
                    <div className={cardStyles.iconsCont}>
                        <a href={"https://www.instagram.com/kaldevi.ortopedia/"} target="_blank" rel="noreferrer" aria-label="instagram"><div className={`${cardStyles.iconBC} ${cardStyles.instagramBC}`} placeholder="instagram"></div></a>
                        <a href={mapLink} target="_blank" rel="noreferrer" aria-label="maps"><div className={`${cardStyles.iconBC} ${cardStyles.mapsBC}`} placeholder="maps"></div></a>
                        <a href={"mailto:" + email} target="_blank" rel="noreferrer" aria-label="email"><div className={`${cardStyles.iconBC} ${cardStyles.emailBC}`} placeholder="email"></div></a>
                        <a href={"https://kaldevi.es/"} target="_blank" rel="noreferrer" aria-label="web"><div className={`${cardStyles.iconBC} ${cardStyles.webBC}`} placeholder="web"></div></a>
                        {(whatsapp) && <a href={"https://wa.me/34" + whatsapp + "?text=Hola%20" + name + "%2C%20gracias%20por%20tu%20contacto"} target="_blank" rel="noreferrer" aria-label="whatsapp"><div className={`${cardStyles.iconBC} ${cardStyles.whatsappBC}`} placeholder="whatsapp"></div></a>}
                        
                    </div>
                    
                </div> 

            </div>
            <CanvasCards color={color} logo={'/kaldevi_logo3D25anniversary.glb'}/>
        </div>
     );
}

export default CardStandardTemplate;


export const query = graphql`
  query KaldeviCardData($slug: String) {
    info: allMarkdownRemark (
      filter: {
        frontmatter: {slug: {eq: $slug}}
      }
    ) {
      nodes {
        id
        frontmatter {
          company
          name
          surname
          job
          address
          website
          email
          phone
          instagram
          maps
          whatsapp
          contacts{
            relativePath
            publicURL
          }
          color
          slug
          photo{
            relativePath
            publicURL
          }
        }
      }
    }
  }
`