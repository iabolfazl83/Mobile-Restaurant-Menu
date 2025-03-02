import React, {useState, useEffect, useRef} from "react";
import {RouterProvider} from "react-router-dom";
import {AppContext} from "@/Context/AppContext.jsx";
import {getAllCategories, getProductsByCategory} from "./services/apiServices/GetRequests.jsx";
import {routes} from "@/routes.jsx";

function App() {
    const listRef = useRef(null);
    const [listItemIndex, setListItemIndex] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState({isOpen: false, elementClass: ""});
    const [showLoader, setShowLoader] = useState(false);
    const [productsByCategory, setProductsByCategory] = useState([]);

    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                const {data} = await getAllCategories();
                return data.content;
            } catch (err) {
                console.log(err.message)
            }
        }

        const init = async () => {
            try {
                setShowLoader(true);
                const res = await fetchCategoriesData();
                const result = [];
                for (let category of res) {
                    result.push(category);
                    const {data} = await getProductsByCategory(category.id);
                    result.push(...data.content);
                }
                setProductsByCategory(result)
                setShowLoader(false);
            } catch (err) {
                console.log(err.message)
                setShowLoader(false);
            }
        }
        init();

        //Advertise
        console.info(
            `%c ᴘʀᴏᴅ.ʙу  [ 🇦ʙᴏʟғᴀᴢʟ ]  ` +
            `%c\n%cReαch me at:` +
            "%c\n\n𝗣𝗵𝗼𝗻𝗲 𝗡𝘂𝗺𝗯𝗲𝗿 : %c +989335403596" +
            "%c\n𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺 : %c https://t.me/+989335403596" +
            "%c\n𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 : %c https://wa.me/+989335403596" +
            "%c\n𝗚𝗶𝘁𝗛𝘂𝗯 : %c https://github.com/iabolfazl83" +
            "%c\n𝗟𝗶𝗻𝗸𝗲𝗱𝗜𝗻 : %c https://www.linkedin.com/in/abolfazlabbaspour",
            "color:#0dd8d8; background:#0b1021; font-size:18px; padding:0.19rem 0.25rem; margin: 1rem auto; font-family: Rockwell; border: 2px solid #0dd8d8; border-radius: 4px;font-weight: bold; text-shadow: 1px 1px 1px #00af87bf;",
            "border: none;",
            "text-shadow: 1px 1px 1px #000000bf; font-weight: bold;  font-weight: bold; font-size: 16px; background-color:#0dd8d866; border-radius: 4px; padding: 2px 5px; border: 2px solid #0b1021;",
            "font-family: Helvetica; font-size: 14px; color: #1cce69; margin: .25rem 0;", "font-family: Helvetica; font-size: 13px; text-decoration: underline;",
            "font-family: Helvetica; font-size: 14px; color: #0088cc; margin: .25rem 0;", "font-family: Helvetica; font-size: 13px;",
            "font-family: Helvetica; font-size: 14px; color: #25D366; margin: .25rem 0;", "font-family: Helvetica; font-size: 13px;",
            "font-family: Helvetica; font-size: 14px; color: #1d1a1a; margin: .25rem 0;", "font-family: Helvetica; font-size: 13px;",
            "font-family: Helvetica; font-size: 14px; color: #0C63BC; margin: .25rem 0;", "font-family: Helvetica; font-size: 13px;"
        );
    }, [])

    return (
        <AppContext.Provider value={{
            listRef,
            listItemIndex,
            setListItemIndex,
            modalIsOpen,
            setModalIsOpen,
            productsByCategory,
            showLoader,
            setShowLoader,
        }}>
            <div className="App">
                <RouterProvider router={routes}/>
            </div>
        </AppContext.Provider>
    );
}

export default App;