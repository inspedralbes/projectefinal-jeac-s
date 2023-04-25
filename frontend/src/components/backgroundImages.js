import { useSelector } from 'react-redux';

function BGImage() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const storeItems = useSelector((state) => state.storeItems);
    const boughtItems = useSelector((state) => state.boughtItems);
    const userInfo = useSelector((state) => state.data);

    const imgAvatar = "Controller.jpg"

    return imgAvatar
}

export default BGImage;