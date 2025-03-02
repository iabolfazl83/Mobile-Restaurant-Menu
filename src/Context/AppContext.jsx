import {createContext, createRef} from "react";

export const AppContext = createContext({
    //products list ref
    listRef: createRef(),
    //list item index
    listItemIndex: 0,
    setListItemIndex: () => {},
    //popup modal
    modalIsOpen: {isOpen: false, elementClass: ""},
    setModalIsOpen: () => {},
    // get a specific category products
    productsByCategory: {},
    setProductsByCategory: () => {},
    //Loader
    showLoader: false,
    setShowLoader: () => {},
})