import React from 'react';
import MultipleSelect from '../../features/SelectСertificate/SelectСertificate';
import image from '../../images/photo_2023-10-28_12-14-10-removebg-preview.png'
import style from './MainPage.module.scss'


const MainPage = () => {
    return (
        <div className={style.mainPage}>
            <img src={image} alt='girl' className={style.img}></img>
            <div className={style.selectContainer}> 
            <MultipleSelect/>
            </div>
           
        </div>
    );
};

export default MainPage;