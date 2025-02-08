import { useDispatch } from "react-redux";
import { setUserDonutList } from "../store/slices/donutSlice";

export const useAddToCart = () => {
    const dispatch = useDispatch();

    const handleAddToCart = (donutList) => {
        console.log(donutList)
        dispatch(setUserDonutList(donutList));
    }
    return {handleAddToCart};
}