import React, {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "@/Context/AppContext.jsx";
import {Link} from "react-router-dom";
import {Images} from "@/helpers/photos.jsx";
import {Swiper, SwiperSlide} from 'swiper/react';
import {VariableSizeList as List} from "react-window";
import "./Products.scss";
import 'swiper/css';
import {Loading, Modal} from "@/components/index.jsx";

function Products() {
    const {
        listRef,
        setListItemIndex,
        listItemIndex,
        modalIsOpen,
        setModalIsOpen,
        productsByCategory,
        showLoader
    } = useContext(AppContext);
    const clickedProduct = useRef({});
    const swiperInstance = useRef(null);
    const [loggedIndices, setLoggedIndices] = useState(new Set());
    const [orders, setOrders] = useState({});
    const showScrollUp = useRef(false)

    // Flags to prevent recursive triggering
    let isScrolling = useRef(false);
    let isSwiping = useRef(false);

    const Row = ({index, style}) => {
        let p = productsByCategory[index];
        return (
            <div className={`category-container`} style={style} key={`category-container-${index}`}>
                {Object.prototype.hasOwnProperty.call(p, 'price') ? (
                    <div key={`product-${p.id}-${index}}`} className="category-body px-2 rounded-4 my-3"
                         onClick={() => {
                             clickedProduct.current = p;
                             setModalIsOpen({...modalIsOpen, isOpen: true, elementClass: document.querySelector(".popup-content-container").className});
                         }}>
                        <div className="category-body-content">
                            <div className="category-body-item py-2">
                                <div className="d-flex align-items-center h-100 w-100 gap-3">
                                    <div className="category-body-item-info d-flex flex-column col py-2 text-end">
                                        <div className="item-info-title line-clamp-3 fs-16 fw-600">
                                            <p> {p.name} </p>
                                        </div>
                                        <div className="item-info-description fs-12 fw-light">
                                            <p> {p.description} </p>
                                        </div>
                                        <div
                                            className="item-info-price d-flex flex-row-reverse align-items-center gap-2">
                                            <p className="fs-18 fw-bold fa-nu"> {p.price} </p>
                                            <p className="fs-12 fw-light lh-1">هـــزار<br/>تومان </p>
                                        </div>
                                    </div>
                                    <div className="category-body-item-photo col-5">
                                        <div>
                                            <img className="w-100 rounded-3 object-fit-cover" src={p.picturePath}
                                                 alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div data-index={index} id={p.id} className="category-header fw-bold fs-16">
                        <div className="divider">
                            <p>{p.name}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    useEffect(() => {
        productsByCategory.length && goToSection(listItemIndex);
    }, [listItemIndex]);

    function goToSection(index) {
        listRef.current.scrollToItem(index, "start");
    }

    const getOriginalIndex = (realIndex) => {
        let currentIndex = 0;
        let categoryCount = -1;
        for (let i = 0; i < productsByCategory.length; i++) {
            if (!Object.prototype.hasOwnProperty.call(productsByCategory[i], 'price')) {
                categoryCount++;
                if (categoryCount === realIndex) {
                    currentIndex = i;
                    break;
                }
            }
        }
        return currentIndex;
    };

    let handleItemsRendered = ({visibleStartIndex, visibleStopIndex}) => {
        if (isSwiping.current) return;

        isScrolling.current = true;
        const newLoggedIndices = new Set();
        let firstVisibleIndex = -1;
        const categoryHeaders = productsByCategory.filter((category, index) => {
            if (!Object.prototype.hasOwnProperty.call(category, 'price')) {
                return category + index;
            }
        })

        for (let i = visibleStartIndex; i <= visibleStopIndex; i++) {
            const element = document.querySelector(".category-header");
            if (element) {
                const index = parseInt(element.id);
                newLoggedIndices.add(index);
                if (firstVisibleIndex === -1) {
                    categoryHeaders.forEach((e, Eindex) => {
                        if (e.id === index) {
                            firstVisibleIndex = Eindex;
                        }
                    })
                }
            }
        }

        if (firstVisibleIndex !== -1 && firstVisibleIndex !== swiperInstance.current?.realIndex) {
            swiperInstance.current.slideTo(firstVisibleIndex);
        }

        setLoggedIndices(newLoggedIndices);
        isScrolling.current = false;
    };

    return (
        <>
            <div className={`main-content-2`}>
                <Modal elementClass={modalIsOpen.elementClass} isOpen={modalIsOpen.isOpen} onClose={() => setModalIsOpen({...modalIsOpen, isOpen: false})}>
                    <div className="popup-content-container d-flex flex-column">
                        <div className="popup-photo position-fixed text-center">
                            <img className="object-fit-cover primary-border rounded-3 w-100"
                                 src={clickedProduct.current.picturePath} alt=""/>
                        </div>
                        <div
                            className="popup-info-container col primary-bg primary-border rounded-4 position-absolute top-0 bottom-0">
                            <div className="burger-menu-icon text-center p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-8 w-8">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                                </svg>
                            </div>
                            <div className="popup-info-header p-2 px-3 fs-18 fw-500">{clickedProduct.current.name}</div>
                            <div className="divider px-3"></div>
                            <div
                                className="add-to-cart-btn d-flex align-items-center justify-content-center">
                                <div
                                    className="primary-border border-white px-2 py-1 w-auto rounded d-flex gap-3 align-items-center justify-content-center">
                                    <div className="d-flex gap-2 align-items-center justify-content-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"></path>
                                        </svg>
                                    </div>
                                    <div>یادداشت سفارش</div>
                                </div>
                            </div>
                            <div className="popup-info-text px-3">{clickedProduct.current.description}</div>
                        </div>
                    </div>
                </Modal>
                <Modal elementClass={modalIsOpen.elementClass} isOpen={modalIsOpen.isOpen} onClose={() => setModalIsOpen({...modalIsOpen, isOpen: false})}>
                    <div className="cart-popup-content-container">
                        <div className="cart-popup-content">
                            <div className="cart-popup-header">
                                <span>یادداشت سفارش من</span>
                            </div>
                            <div className="cart-popup-body">
                                {
                                    orders.length ? ""
                                        : "هیچ آیتمی در یادداشت سفارش شما وجود ندارد."
                                }
                            </div>
                        </div>
                    </div>
                </Modal>
                <div className="category-items-wrapper">
                    <div className="category-items-container">
                        <div className="d-flex flex-column gap-3">
                            <div
                                className={`${showScrollUp.current ? 'go-up-btn-show' : 'go-up-btn-hidden'} go-up-btn position-fixed z-index-1 glass-bg rounded-circle p-1`}
                                onClick={() => {
                                    listRef.current.scrollTo(0, 0);
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M4.5 15.75l7.5-7.5 7.5 7.5"></path>
                                </svg>
                            </div>
                            <div
                                className="cart-btn position-fixed z-index-1 glass-bg rounded-circle p-1"
                                onClick={() => setModalIsOpen({...modalIsOpen, isOpen: true, elementClass: document.querySelector(".popup-content-container").className})}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"></path>
                                </svg>
                            </div>
                            <div className="vw-100 px-3 mt-3 back-to-menu-btn m-auto">
                                <Link to="/" className="link">
                                    <div
                                        className="d-flex justify-content-between rounded-5 glass-bg hover border border-2 border-white h-100">
                                        <div
                                            className="d-flex justify-content-center align-items-center back-to-menu-btn-logo">
                                            <div className="bg-white rounded-circle overflow-hidden bg-transparent">
                                                <img className="p-1 pe-0 w-100" src={Images.userLogo} alt=""/>
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <div>
                                                <span>بازگشت به منوی کافه </span>
                                                <strong> خیام</strong>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="d-flex flex-column px-3">
                                <div className="category-items-header">
                                    <div
                                        className="category-items-sticky-menu position-sticky overflow-hidden top-0 glass-bg rounded-4 w-100 border border-2 py-2 m-auto">
                                        <Swiper
                                            dir="rtl"
                                            breakpoints={{
                                                320: {slidesPerView: 2.5},
                                                768: {slidesPerView: 4.5},
                                                1024: {slidesPerView: 6},
                                                1440: {slidesPerView: 10},
                                            }}
                                            grabCursor={true}
                                            slidesPerView={3}
                                            centeredSlides={true}
                                            spaceBetween={20}
                                            slideToClickedSlide={true}
                                            onSwiper={(swiper) => {
                                                swiperInstance.current = swiper;
                                            }}
                                            onSlideChangeTransitionEnd={() => {
                                                isSwiping.current = false;
                                            }}
                                            onSlideChange={(swiperCore) => {
                                                if (isScrolling.current) return;

                                                isSwiping.current = true;
                                                const originalIndex = getOriginalIndex(swiperCore.realIndex);
                                                goToSection(originalIndex);
                                                setListItemIndex(originalIndex);
                                            }}
                                            className="sticky-categories-slider"
                                        >
                                            {showLoader ?
                                                <Loading/> : productsByCategory.map((category, originalIndex) => {
                                                    if (Object.prototype.hasOwnProperty.call(category, 'price')) {
                                                        return null;
                                                    }
                                                    return (
                                                        <div key={`Swiper-Slider-wrapper-${category.id}`}>
                                                            <SwiperSlide key={`Swiper-Slider-${category.id}`}
                                                                         onClick={() => {
                                                                             if (isScrolling.current) return;

                                                                             isSwiping.current = true;
                                                                             goToSection(originalIndex);
                                                                             setListItemIndex(originalIndex);
                                                                         }}>
                                                                <div
                                                                    className="category-sticky-menu-item d-flex align-items-center justify-content-center">
                                                                    <div
                                                                        className="d-flex align-items-center justify-content-center glass-bg w-100 hover rounded-circle py-2 px-1">
                                                                        <div>
                                                                            <img
                                                                                className="sticky-menu-item-photo w-100"
                                                                                src={category.picturePath} alt=""/>
                                                                        </div>
                                                                        <div
                                                                            className="line-clamp-2 fs-12 col fw-normal show-when-active text-center">
                                                                            {category.name}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                        </div>
                                                    );
                                                })}
                                        </Swiper>
                                    </div>
                                </div>
                                {productsByCategory.length && (
                                    <List
                                        className="category-items-list"
                                        ref={listRef}
                                        onScroll={(e) => {
                                            e.scrollOffset > 200 ? showScrollUp.current = true : showScrollUp.current = false;
                                        }}
                                        onItemsRendered={throttle(handleItemsRendered, 200)}
                                        height={window.innerHeight - 156}
                                        itemCount={productsByCategory.length}
                                        itemSize={(index) => {
                                            return Object.prototype.hasOwnProperty.call(productsByCategory[index], 'price') ? 180 : 50;
                                        }}
                                        width={"100%"}
                                    >
                                        {Row}
                                    </List>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;

// Throttle function to limit the rate of function execution
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}