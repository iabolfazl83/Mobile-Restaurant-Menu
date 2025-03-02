import {createBrowserRouter, Link, ScrollRestoration} from "react-router-dom";
import {ContactUs, Products, HomePage} from "@/components/index.jsx";
import {Images} from "@/helpers/photos.jsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <ScrollRestoration/>
                <HomePage/>
            </>
        )
    },
    {
        path: "/contact-us",
        element: (
            <>
                <ScrollRestoration/>
                <ContactUs/>
            </>
        )
    },
    {
        path: "/products",
        element: (
            <>
                <ScrollRestoration/>
                <Products/>
            </>
        )
    },
    {
        path: "*",
        element: (
            <main className="container m-auto">
                <div className="container w-auto d-flex flex-column gap-5 align-items-center">
                    <div className="w-25">
                        <img className="w-100" src={Images.error404} alt="404 error"/>
                    </div>
                    <div className="fs-5 text-404">این راه به جایی نمی‌رسه!</div>
                    <div>
                        <p className="text-404 text-center">به نظر آدرس را اشتباه وارد کرده‌اید.</p>
                        <p className="text-404 text-center">برای پیدا کردن مسیر درست می‌توانید <Link
                            className="active-page fw-bolder" to={"/"}>به خانه بازگردید</Link>.</p>
                    </div>
                </div>
            </main>
        )
    }
]);

export {routes};
