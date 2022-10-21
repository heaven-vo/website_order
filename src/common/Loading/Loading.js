import { BallTriangle } from "react-loading-icons";
import "./style.css";
function Loading({ isLoading, opacity }) {
    return (
        <div className="loading-wrapper container" style={{ display: isLoading ? "flex" : "none", opacity: opacity }}>
            <BallTriangle stroke="var(--primary)" />
        </div>
    );
}
export default Loading;
