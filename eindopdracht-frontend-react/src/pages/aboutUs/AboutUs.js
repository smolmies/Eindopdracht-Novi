import React from 'react';
import './AboutUs.scss';
import Header from '../../components/header/Header';

function AboutUs() {
    return (
        <>
            <Header />
            <div className='row'>
                <article className='column'>
                    <h3>Leven vol dierenliefde!</h3>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid deserunt eaque eos esse fugiat, ipsam necessitatibus qui temporibus tenetur ullam vero. Inventore, ipsam?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam aliquid animi autem blanditiis cum distinctio doloremque enim, magnam maiores modi mollitia neque nisi odit provident quia quibusdam quidem quos rerum saepe sit totam vel!
                </article>

                <article className='column'>
                <h3>Passie werd mijn werk</h3>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid deserunt eaque eos esse fugiat, ipsam necessitatibus qui temporibus tenetur ullam vero. Inventore, ipsam?
                </article>
            </div>
            <div className='row'>
                <article className='column'>
                    <h3>Verzorging</h3>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid deserunt eaque eos esse fugiat, ipsam necessitatibus qui temporibus tenetur ullam vero. Inventore, ipsam?
                </article>

                <article className='column'>
                    <h3>Verblijven</h3>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid deserunt eaque eos esse fugiat, ipsam necessitatibus qui temporibus tenetur ullam vero. Inventore, ipsam?

                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid deserunt eaque eos esse fugiat, ipsam necessitatibus qui temporibus tenetur ullam vero. Inventore, ipsam?
                </article>
            </div>

        </>
    );
}

export default AboutUs;