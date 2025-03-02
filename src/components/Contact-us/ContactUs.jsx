import "./ContactUs.scss";
import {BackgroundPoster, Logo} from "../index.jsx";
import {Images} from "../../helpers/photos.jsx";
import {Link} from "react-router-dom";

function ContactUs() {
    return (
        <div className="contact-us-wrapper">
            <BackgroundPoster/>
            <div className="floating-btn fixed-bottom end-0 start-0 d-flex justify-content-center align-items-center">
                <div className="glass-bg px-4 py-2 mb-3 border-white border rounded-5 hover">
                    <Link className="link" to="/">
                        <div className="d-flex justify-content-between align-items-center gap-2 text-white">
                            <div className="fs-22">
                                <i className="fa-solid fa-utensils fork-icon"></i>
                            </div>
                            <div className="fs-18">
                                مشاهده منو
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="contact-us-container position-relative container-fluid">
                <div className="user-logo w-50 m-auto mb-4 pt-4">
                    <Logo imgSize={100}/>
                </div>
                <div className="user-intro text-center fw-medium mb-5">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                    چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                    نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته
                    حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.
                </div>
                <div className="user-open-table-wrapper glass-bg mb-5">
                    <div className="user-open-table-container py-3 px-4">
                        <div className="user-open-table">
                            <div
                                className="user-open-table-header d-flex align-items-center justify-content-center border-bottom pb-2">
                                <div className="text-center">
                                    <img className="w-50 col" src={Images.badgeClose} alt=""/>
                                </div>
                                <div className="col">
                                    در حال حاضر از سرویس‌دهی معذوریم.
                                </div>
                            </div>
                            <div className="user-open-table-body">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-gallery"></div>
                <div className="user-map-wrapper glass-bg">
                    <div className="user-map-container py-3 px-4">
                        <div className="user-map">
                            <div>
                                <img className="w-100 rounded-4" src={Images.location} alt=""/>
                            </div>
                            <div className="d-flex align-items-center gap-2 my-3 mx-1">
                                <div className="d-flex align-items-center fs-16"><i
                                    className="text-dark fa-solid fa-phone ms-2"></i>شماره تماس :
                                </div>
                                <a className="fs-16 text-white hover" href="tel:+98912123456">0912123456</a>
                            </div>
                            <div className="d-flex align-items-center gap-2 my-3 mx-1">
                                <div className="d-flex align-items-center fs-16"><i
                                    className="text-dark fa-solid fa-globe ms-2"></i>صفحات مجازی :
                                </div>
                                <div className="d-flex align-items-center gap-2 social-media-links">
                                    <a href="https://www.instagram.com/" target="_blank"><i
                                        className="ig-logo fa-brands fa-instagram fs-25"></i></a>
                                    <a href="https://www.whatsapp.com/" target="_blank"><i
                                        className="whatsapp-logo fa-brands fa-whatsapp fs-25"></i></a>
                                    <a href="https://telegram.org/" target="_blank"><i
                                        className="telegram-logo fa-brands fa-telegram fs-25"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs;