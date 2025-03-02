import {useContext} from "react";
import {AppContext} from "@/Context/AppContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import {BackgroundPoster, Loading, Logo} from "../../index.jsx";
import "./Main.scss"
import "./Main.mediaQuery.scss"


function Main() {
    const {showLoader, productsByCategory, setListItemIndex} = useContext(AppContext)
    const navigate = useNavigate();

    return (
        <div className="main-wrapper">
            <div className="bg-with-logo">
                <BackgroundPoster/>
                <div className="user-logo-wrapper position-fixed z-index-9 top-50 translate-middle-y w-100">
                    <div className="user-logo d-flex justify-content-center align-items-center">
                        <Logo imgSize={50}/>
                    </div>
                </div>
            </div>

            <div className={`main-section-2 position-sticky top-0`}>
                <div className="main-content-1">
                    <div className="more-info-wrapper text-center">
                        <Link to="/contact-us" className="link d-inline-block">
                            <div
                                className="more-info hover glass-bg mt-3 position-relative w-100 d-flex justify-content-center align-items-center text-white fs-13">
                                <nav className="more-info-nav">
                                    <div>تماس با ما</div>
                                </nav>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={`categories-wrapper glass-bg position-sticky w-100 top-0 z-index-9`}>
                <div className="categories">
                    <div className="rounded-bottom-0 glass-bg categories-header-wrapper">
                        <div className="categories-header d-flex justify-content-around align-items-center">
                            <div>گزینش میان <strong> دسته بندی‌ها</strong></div>
                            <div className="mx-3">یا</div>
                            <div className="p-2 ps-0">
                                <Link to={"/products"} className="link">
                                    <button
                                        className="hover glass-bg btn btn-sm d-flex align-items-center gap-2 fw-bold text-white fs-13">
                                        <div>
                                            <div>شـــــروع به</div>
                                            <div> گشت و گذار</div>
                                        </div>
                                        <div><i className="fa-solid fa-arrow-left-long"></i></div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="categories-body-wrapper">
                        <div className="categories-body">
                            <div className="category-items d-grid">
                                {
                                    showLoader ? <Loading/> :
                                    productsByCategory.map((category, originalIndex) => {
                                        if (Object.prototype.hasOwnProperty.call(category, 'price')) {
                                            return null;
                                        }
                                        return (
                                            <div key={category.id}>
                                                <div className="category-item w-100"
                                                     onClick={() => {
                                                         setListItemIndex(originalIndex)
                                                         navigate("/products")
                                                     }}>
                                                    <button
                                                        className="category-item-btn btn glass-bg hover w-100 h-100 w-100">
                                                        <div className="category-item-info d-flex flex-column gap-2">
                                                            <div className="category-item-photo">
                                                                <div>
                                                                    <img className="w-100" src={category.picturePath}
                                                                         alt=""/>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="category-item-name text-white fs-12">{category.name}</div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;