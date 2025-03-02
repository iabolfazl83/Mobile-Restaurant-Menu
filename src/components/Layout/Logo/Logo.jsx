import {Images} from "@/helpers/photos.jsx";
import {PropTypes} from 'prop-types';


function Logo({imgSize}) {

    return (
        <img className={`w-${imgSize}`} src={Images.userLogo} alt=""/>
    )
}

Logo.propTypes = {
    imgSize: PropTypes.number,
};

export default Logo;